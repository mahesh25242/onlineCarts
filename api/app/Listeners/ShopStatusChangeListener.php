<?php

namespace App\Listeners;

use App\Events\ShopStatusChangeEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\ShopStatusChangeNotification;
use Mail;
use Illuminate\Http\Request;

class ShopStatusChangeListener
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
    public function handle(ShopStatusChangeEvent $event)
    {

        $shopMessage = null;
        if(isset($event->others["pmn"])){
            $prefillMessage  = \App\Models\PrefillMessage::where("name", $event->others["pmn"])->get()->first();
            $shopMessage = new \App\Models\ShopMessage;
            $shopMessage->prefill_message_id = $prefillMessage->id;
            $shopMessage->shop_id = $event->shop->id;
            $shopMessage->save();
        }

        if(!$event->shop->status){
            $others = [];
            $toEMail = $event->shop->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }



            if($shopMessage){
                $others["m"] = $shopMessage->prefillMessage->message;
            }

            try{
               Mail::to($toEMail)->send(new ShopStatusChangeNotification($event->shop, $others));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        }




    }


}
