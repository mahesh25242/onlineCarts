<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\Shop;

class ShopStatusChangeNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */

    public $shop;
    public $others;
    public function __construct(Shop $shop, $others = null )
    {
        $this->shop = $shop;
        $this->others = $others;
    }



    public function build()
    {
        return $this->view('email/shopStatusChangeNotification', [
            "shop" => $this->shop,
            "others" => $this->others
        ]);
    }
}
