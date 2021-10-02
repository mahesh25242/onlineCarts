<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\Contact;

class ContactUsUserNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $contact;
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }




    public function build()
    {
        return $this->view('email/contactUsUserNotification', ["details" => $this->contact]);
    }
}
