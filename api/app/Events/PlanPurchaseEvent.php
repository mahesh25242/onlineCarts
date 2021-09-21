<?php

namespace App\Events;

class PlanPurchaseEvent extends Event
{
    var $shopRenewal;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($shopRenewal=null)
    {
        $this->shopRenewal = $shopRenewal;
    }
}
