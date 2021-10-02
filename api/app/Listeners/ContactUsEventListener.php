<?php

namespace App\Listeners;

use App\Events\ContactUsEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\ContactUsAdminNotification;
use App\Mail\ContactUsUserNotification;
use Mail;
use Illuminate\Http\Request;



class ContactUsEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(ContactUsEvent $event)
    {

        if($event->details){

            $setting = \App\Models\Setting::where("name", "shop_expiry_email")->get()->first();
            $toEMail = $setting->value;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
                if($toEMail)
                    Mail::to($toEMail)->send(new ContactUsAdminNotification($event->details));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }

            $toEMail = $event->details->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
                if($toEMail)
                    Mail::to($toEMail)->send(new ContactUsUserNotification($event->details));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }


        }
    }
}
