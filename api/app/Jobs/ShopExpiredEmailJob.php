<?php

namespace App\Jobs;


use App\Mail\ShopExpiredNotification;
use Mail;
use App\Models\ShopRenewal;

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
        $shopRenewal = ShopRenewal::where("to_date" ,'<', \Carbon\Carbon::now())->whereHas("shop", function($q){
            $q->where('status', 1);
        });

        $shopRenewal->chunk(100, function ($shop_renewal)  {
            foreach ($users as $user) {
                 $email = new ShopExpiredNotification($shop_renewal->shop);
                 $toEMail = $shop_renewal->shop->email;
                 if(env('APP_ENV') == 'local'){
                    $toEMail = env('DEVELOPER_MAIL');
                    Mail::to($toEMail)->send($email);
                 }else{
                    Mail::to($user->email)->send($email);
                 }
                 $shop_renewal->shop->status = 0;
                 $shop_renewal->shop->save();
            }
          });


    }
}
