<?php

namespace App\Jobs;


use Mail;
use App\Models\Setting;
use App\Mail\NewTicketAdminNotification;
use App\Mail\NewTicketUserNotification;
use App\Models\ShopRenewal;

class TicketCreated extends Job
{

    protected $ticket;
    public $timeout = 7200; // 2 hours

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($ticket)
    {
        $this->ticket = $ticket;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $email = new NewTicketAdminNotification($this->ticket);

        $settings = Setting::where("name", "ticket_mail")->get()->first();
        $toEMail = $settings->value;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
            Mail::to($toEMail)->send($email);
        }else{
            Mail::to($toEMail)->send($email);
        }

        $email = new NewTicketUserNotification($this->ticket);

        $toEMail = $this->ticket->shop->email;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
            Mail::to($toEMail)->send($email);
        }else{
            Mail::to($toEMail)->send($email);
        }

    }

}
