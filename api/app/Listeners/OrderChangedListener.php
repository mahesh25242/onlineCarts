<?php

namespace App\Listeners;

use App\Events\OrderChangedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;



use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\WebPushConfig;



class OrderChangedListener
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
    public function handle(OrderChangedEvent $event)
    {
        $messaging = app('firebase.messaging');
        if($event->order && $event->order->web_push_token){
            $deviceTokens =[$event->order->web_push_token];
            if(!$event->order->sec_key){
                $event->order->sec_key =  sha1(time().'-'.$event->order->id);
                $event->order->save();
            }


            $title = sprintf("Order status changed #%d", $event->order->id);
            $body = sprintf("Hi %s your order #%d  set as %s",  $event->order->shopCustomer->name, $event->order->id, $event->order->status_text);

            $config = WebPushConfig::fromArray([
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                    'icon' => $event->order->shop->logo,
                ],
                'fcm_options' => [
                    'link' => $event->order->shop->shop_url."/order/{$event->order->sec_key}",
                ],
            ]);

            $message = CloudMessage::new()->withWebPushConfig($config)->withDefaultSounds();
            $sendReport = $messaging->sendMulticast($message, $deviceTokens);

        }
    }
}
