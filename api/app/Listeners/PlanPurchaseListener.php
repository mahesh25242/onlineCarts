<?php

namespace App\Listeners;

use App\Events\PlanPurchaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use App\Mail\AdminSubscriptionChangeNotification;
use Mail;
use Illuminate\Http\Request;

class PlanPurchaseListener
{
    var $request;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(PlanPurchaseEvent $event)
    {

        if($event->shopRenewal->id ){
            $pdf = PDF::loadView('pdf.shopInvoice', array(
                "shopRenewal" => $event->shopRenewal,
                "request" =>$this->request
            ));

            $pdf->save($this->public_path("assets/invoices/{$event->shopRenewal->id}.pdf"));

            $toEMail = $event->shopRenewal->shop->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
               Mail::to($toEMail)->send(new AdminSubscriptionChangeNotification($event->shopRenewal));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }

            //mail to super user
            $setting = \App\Models\Setting::where("name", "shop_expiry_email")->get()->first();
            $toEMail = $setting->value;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }
            if($toEMail){
                try{
                    Mail::to($toEMail)->send(new AdminSubscriptionChangeNotification($event->shopRenewal));
                }catch (\Swift_TransportException $e) {
                    //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }
            }
        }


    }

    private function  public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }

}
