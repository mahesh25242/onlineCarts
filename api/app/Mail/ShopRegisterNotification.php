<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\User;
use App\Models\Shop;
class ShopRegisterNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public $shop;
    public function __construct(User $user, Shop $shop)
    {
        $this->user = $user;
        $this->shop = $shop;
    }



    public function build()
    {
        return $this->view('email/shopRegisterNotification', [
            "user" => $this->user,
            "shop" => $this->shop
            ]);
    }
}
