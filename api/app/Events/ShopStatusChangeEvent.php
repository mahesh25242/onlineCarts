<?php

namespace App\Events;

class ShopStatusChangeEvent extends Event
{
    var $shop;
    var $others;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($shop=null, $others = null)
    {
        $this->shop = $shop;
        $this->others = $others;
    }
}
