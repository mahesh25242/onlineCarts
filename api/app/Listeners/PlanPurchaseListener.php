<?php

namespace App\Listeners;

use App\Events\PlanPurchaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use App\Mail\InvoiceMail;
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
            $pdf = PDF::loadView('PDF.shopInvoice', array(
                "shopRenewal" => $shopRenewal,
                "request" =>$this->request
            ));
            $pdf->save(public_path("assets/invoices/{$shopRenewal->id}.pdf"));

            $toEMail = $shopRenewal->shop->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
              //  Mail::to($toEMail)->send(new AdminSubscriptionChangeNotification($shopRenewal));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }

            //mail to super user
            $setting = \App\Setting::where("name", "shop_expiry_email")->get()->first();
            $toEMail = $setting->value;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }
            if($toEMail){
                try{
                    Mail::to($toEMail)->send(new AdminSubscriptionChangeNotification($shopRenewal));
                }catch (\Swift_TransportException $e) {
                    //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }
            }
        }


    }
}
