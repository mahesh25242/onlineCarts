<?php

namespace App\Events;

class ContactUsEvent extends Event
{
    var $details;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }
}
