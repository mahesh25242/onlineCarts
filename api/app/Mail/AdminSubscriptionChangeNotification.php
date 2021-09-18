<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\ShopRenewal;
class AdminSubscriptionChangeNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $shopRenewal;
    public function __construct(ShopRenewal $shopRenewal)
    {
        $this->shopRenewal = $shopRenewal;
    }



    public function build()
    {
        return $this->view('email/adminSubscriptionChangeNotification', ["shopRenewal" => $this->shopRenewal]);

    }
}
