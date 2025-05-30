<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\Models\HelpTicket;
class NewTicketAdminNotification extends Mailable
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
        if($this->helpTicket->parent){
            return $this->view('email/TicketReplyAdminNotification', ["helpTicket" => $this->helpTicket]);
        }else{
            return $this->view('email/newTicketAdminNotification', ["helpTicket" => $this->helpTicket]);
        }

    }
}
