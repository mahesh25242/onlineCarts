<?php

namespace App\Providers;

use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \App\Events\ExampleEvent::class => [
            \App\Listeners\ExampleListener::class,
        ],
        \App\Events\OrderChangedEvent::class => [
            \App\Listeners\OrderChangedListener::class,
        ],
        \App\Events\PlanPurchaseEvent::class => [            
            \App\Listeners\PlanPurchaseListener::class,
        ],
        \App\Events\ShopStatusChangeEvent::class => [
            \App\Listeners\ShopStatusChangeListener::class,
        ],
        \App\Events\ContactUsEvent::class => [
            \App\Listeners\ContactUsEventListener::class,
        ],
        \App\Events\OrderCreatedEvent::class => [
            \App\Listeners\OrderCreatedListener::class,
        ],
    ];
}
