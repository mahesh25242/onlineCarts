<?php
namespace App\Http\Controllers\BotMan;

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use App\Http\Controllers\BotManController;

class OnStartConversation extends Conversation
{
    protected $firstname;

    protected $email;
    protected $user;
    protected $shop;
    protected $cartUrl = 'https://onlinecarts.in/';





    public function askFirstname()
    {
        $this->ask('Hi ! may i know your name?', function(Answer $answer) {
            // Save result
            $this->firstname = $answer->getText();
            $this->say('Nice to meet you '.$this->firstname);

            $this->hasNotAccount();
        });
    }

    public function askEmail()
    {


        $this->ask('Please provide your email?', function(Answer $answer) {
            // Save result
            $this->email = $answer->getText();


            if($this->email){
                $this->user  = \App\Models\User::where("email", $this->email)->get()->first();


                if($this->user){
                    $this->haveAnAccount();
                    return;
                }
            }
            $this->askFirstname();



        });
    }

    public function haveAnAccount()
    {

        $question = Question::create('Do you have any query with your account? Say yes or no')
        ->addButtons([
            Button::create("Yes")->value("yes"),
            Button::create("No")->value("no"),
        ]);

        $this->ask($question, [
            [
                'pattern' => 'yes|yep|y',
                'callback' => function () {
                    $this->askRegisteredPhone();
                }
            ],
            [
                'pattern' => 'nah|no|nope|n',
                'callback' => function () {
                    $this->contactUsLink();
                }
            ]
        ]);

    }

    public function askRegisteredPhone(){
        $this->ask('Can you provide your registed shop\'s phone?', function(Answer $answer) {
            // Save result
            $phone = $answer->getText();



            if($this->user && $this->user->userRole){



                if($this->user->userRole->count() > 1){
                    $this->listShops();
                }else{
                    if(substr($this->user->userRole->first()->shop->phone, -10) ==  $phone){
                        $this->shop = $this->user->userRole->first()->shop;
                        $this->selectedShop();
                    }else{
                        $this->say(sprintf("Sorry %s, we can't find any account with provided details.", $this->firstname));
                        $this->contactUsLink();
                    }
                }



            }else{
                $this->say(sprintf("Sorry %s, we can't find any account with provided details.", $this->firstname));
                $this->contactUsLink();
            }

        });
    }

    public function selectedShop(){

        $shopButton = [
            Button::create("Shop Status")->value("status"),
        ];
        if(!$this->shop->status){
            $shopButton[] =  Button::create("Why Shop is deactivated")->value("deactivated");
        }
        $question = Question::create(sprintf('what you want to know about %s?', $this->shop->name))
        ->callbackId('shop_selected_service')
        ->addButtons($shopButton);


        $this->ask($question, [
            [
                'pattern' => 'status',
                'callback' => function () {
                    $package =  ( $this->shop->shopCurrentRenewal &&  $this->shop->shopCurrentRenewal->package) ?  $this->shop->shopCurrentRenewal->package->name : '';
                    $this->say('<div>Shop Registered: '.$this->shop->created_at->diffForHumans().'</div>
                                <div>Expired In: '.\Carbon\Carbon::parse($this->shop->shopCurrentRenewal->to_date)->diffForHumans().'</div>
                                <divCurrent Plan: '.$package.'</div>');
                }
            ],
            [
                'pattern' => 'deactivated',
                'callback' => function () {
                    $message = '';
                    if($this->shop->shopStatusMessage->prefill_message_id){
                        $message = $this->shop->shopStatusMessage->prefillMessage->message;
                    }else{
                        $message = $this->shop->shopStatusMessage->message;
                    }
                    $this->say($message);
                    $this->contactUsLink();
                }
            ]
        ]);
    }
    public function listShops(){
        $shopsButton = [];
        foreach($this->user->userRole as $userRole){
            if($userRole->shop->phone == $phone){
                $shopsButton[] = Button::create($userRole->shop->name)->value($userRole->shop->id);
            }
        }

        $question = Question::create('Please select the shop?')
        ->callbackId('shop_selection_service')
        ->addButtons($shopsButton);

        $this->ask($question, function(Answer $answer) {
            if ($answer->isInteractiveMessageReply()) {
                $selected = $answer->getValue();
                // $this->bot->userStorage()->save([
                //     'service' => $answer->getValue(),
                // ]);
                $this->say('selected, <a href="asasas>as</a>'.$selected);
            }
            //$this->bot->startConversation(new NextConversation()); // Trigger the next conversation
        });
    }



    public function contactUsLink(){

        $question = Question::create('You can get more details through our contact us')
        ->callbackId('contact_us_service')
        ->addButtons([
            Button::create('Contact Us')->value('contact us')->additionalParameters(['url' => 'https://onlinecarts.in/front/contact-us']), // Here we want to add URL which should be redirect on new page after click
        ]);

        $this->say($question);
    }

    public function hasNotAccount(){
        $question = Question::create('What kind of help you need from us?')
            ->callbackId('select_service')
            ->addButtons([
                Button::create('Start An Account')->value('register')->additionalParameters([ 'redirect' => "shop/register"]), // Here we want to add URL which should be redirect on new page after click
                Button::create('How its work')->value('howitswork')->additionalParameters([ 'redirect' => "how-it-works"]),
                Button::create('Pricing')->value('pricing')->additionalParameters([ 'redirect' => "pricing"]),
                Button::create('What are coins')->value('coins'),
                Button::create('demo Bakery shop')->value('demo_bakery')->additionalParameters([ 'url' => "{$this->cartUrl}demo"]),
                Button::create('Demo Textile shop')->value('demo_textile')->additionalParameters([ 'url' => "{$this->cartUrl}mks"])
            ]);

            $this->ask($question, function(Answer $answer) {
                if ($answer->isInteractiveMessageReply()) {
                    $selected = $answer->getValue();
                    switch($selected){
                        case "coins":
                            $message= BotManController::view('botMan/common/coins', [

                            ]);

                            $this->say("{$message}");
                        break;
                    }
                }
                //$this->bot->startConversation(new NextConversation()); // Trigger the next conversation
            });

    }





    public function run()
    {
        // This will be called immediately
        $this->askEmail();
    }
}
