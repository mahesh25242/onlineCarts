<?php

namespace App\Jobs;


use App\Mail\ShopExpiredNotification;
use Mail;
use App\Models\ShopRenewal;
use App\Models\Setting;
use App\Models\Shop;

class ShopExpiredEmailJob extends Job
{

    protected $details;
    public $timeout = 7200; // 2 hours

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $settings = Setting::where("name", "shop_expiry_email")->get()->first();
        $adminEMail = $settings->value;


        $shopRenewal = ShopRenewal::where("to_date" ,'<', \Carbon\Carbon::now())->whereHas("shop", function($q){
            $q->where('status', 1);
        });

        $shopRenewal->chunk(100, function ($shop_renewals)  {
            foreach ($shop_renewals as $shop_renewal) {
                $shop = Shop::find($shop_renewal->shop_id);
                $email = new ShopExpiredNotification($shop);
                $toEMail = $shop->email;
                if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
                    Mail::to($toEMail)->send($email);
                }else{
                    Mail::to($adminEMail)->send($email);
                    Mail::to($toEMail)->send($email);
                }
                $shop->status = 0;
                $shop->save();
            }
          });


    }
}
