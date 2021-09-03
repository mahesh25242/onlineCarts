<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\HelpTicket;
class NewTicketUserNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $helpTicket;
    public function __construct(HelpTicket $helpTicket)
    {
        $this->helpTicket = $helpTicket;
    }



    public function build()
    {
        return $this->view('email/newTicketUserNotification', ["helpTicket" => $this->helpTicket]);
    }
}
