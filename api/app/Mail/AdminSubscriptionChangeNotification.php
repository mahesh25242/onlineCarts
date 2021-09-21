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
        return $this->view('email/adminSubscriptionChangeNotification', ["shopRenewal" => $this->shopRenewal])
        ->attach($this->public_path("assets/invoices/{$this->shopRenewal->id}.pdf"));

    }

    private function  public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }
}
