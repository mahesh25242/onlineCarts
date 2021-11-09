<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\Shop;
class ShopHasNoDeliveryPointsNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $shop;
    public function __construct(Shop $shop)
    {
        $this->shop = $shop;
    }



    public function build()
    {
        return $this->view('email/shopHasNoDeliveryPointsNotification', ["shop" => $this->shop]);
    }
}
