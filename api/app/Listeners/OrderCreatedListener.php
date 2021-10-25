<?php

namespace App\Listeners;

use App\Events\OrderCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;



use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\WebPushConfig;

class OrderCreatedListener
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
    public function handle(OrderCreatedEvent $event)
    {
        $messaging = app('firebase.messaging');
        if($event->order){
            $deviceTokens = [];
            foreach($event->order->shop->UserRole->shopUserPushToken as $shopUserPushToken){
                $deviceTokens[] = $shopUserPushToken->web_push_token;
            }


            $title = sprintf("A new order was created #%d", $event->order->id);
            $body = sprintf("%s is order %d item(s)",  $event->order->shopCustomer->name, $event->order->shopOrderItem->count());

            $config = WebPushConfig::fromArray([
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                    'icon' => $event->order->shop->logo,
                    'data' =>["is_admin" => true]
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
