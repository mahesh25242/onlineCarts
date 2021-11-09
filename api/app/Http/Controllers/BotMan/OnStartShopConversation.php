<?php
namespace App\Http\Controllers\BotMan;

use Illuminate\Support\Facades\Auth;

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Attachments\Location;
use BotMan\BotMan\Messages\Outgoing\OutgoingMessage;
use App\Http\Controllers\BotManController;

class OnStartShopConversation extends Conversation
{
    protected $firstname;

    protected $orderId;
    protected $phone;
    protected $user;
    protected $shop;


    protected $cartUrl = 'https://onlinecarts.in/';



    public function __construct($shop) {
        $this->shop = $shop;
    }



    public function startShopChat()
    {
        $buttons = [];

        $buttons[] = Button::create(sprintf("How to contact %s", $this->shop->name))
        ->value("shop_phone");
        $buttons[] = Button::create("Order Tracking")->value("tracking");
        $buttons[] = Button::create("Home Delivery Availability")->value("home_delivery");
        $buttons[] = Button::create("Shop Branches")->value("shop_branches");

        if(Auth::id()){
            array_unshift($buttons , Button::create("Need Help In Admin Section")->value("admin_help"));
        }else{
            $buttons[] = Button::create("Need Help In Admin Section")->value("admin_help");
        }

        $welcomeMessage = "Hi, ";

        if(Auth::id()){
            $welcomeMessage .= sprintf("You are logged in as %s.", Auth::user()->fname);
        }

        $welcomeMessage .= 'How can I help you?';
        $question = Question::create($welcomeMessage)
        ->callbackId('start_shop_chat')
        ->addButtons($buttons);

        $this->ask($question, [
            [
                'pattern' => 'shop_phone|phone|mobile',
                'callback' => function () {
                    $this->contactUsLink();
                }
            ],
            [
                'pattern' => 'tracking|order',
                'callback' => function () {
                    $this->orderTracking();
                }
            ],
            [
                'pattern' => 'home_delivery',
                'callback' => function () {
                    $this->deliveries();
                }
            ],
            [
                'pattern' => 'shop_branches',
                'callback' => function () {
                    $this->deliveries(0);
                }
            ],
            [
                'pattern' => 'admin_help',
                'callback' => function () {
                    $this->adminHelp();
                }
            ],
        ]);
    }


    private function orderTrakInfo($shopOrder = null)
    {
        $orderLink = sprintf("order/%s",$shopOrder->sec_key);
        $question = Question::create('Click below button to know your order details')
        ->callbackId('show_order_service')
        ->addButtons([
            Button::create(sprintf('Order #%s', $this->orderId))->value($shopOrder->id)->additionalParameters(['redirect' => $orderLink]), // Here we want to add URL which should be redirect on new page after click
        ]);

        $this->ask($question, [
            [
                'pattern' => "{$shopOrder->id}",
                'callback' => function () use($shopOrder){
                    $this->say(sprintf('Please check back screen to view %s\'s order details ', $shopOrder->shopCustomer->name));
                    $this->reStartFromBegin();
                }
            ],
        ]);
    }
    public function orderTracking(){
        $this->ask('Can you provide your order number?', function(Answer $answer) {
            // Save result
            $orderNumber = $answer->getText();
            $shopOrder = \App\Models\ShopOrder::where(["shop_id" => $this->shop->id])->find($orderNumber);
            if($shopOrder){
                $this->orderId = $shopOrder->id;
                if($shopOrder->sec_key){
                    if($this->shop->is_default){
                        $this->orderTrakInfo($shopOrder);
                    }else{
                        $this->ask('Can you provide your ordered mobile?', function(Answer $answer) use($shopOrder){
                            $mobile = $answer->getText();
                            if(substr ($shopOrder->shopCustomer->phone, -10) ==  $mobile ){
                                $this->orderTrakInfo($shopOrder);
                            }

                        });
                    }


                }else{
                    $this->say('Your order is with us. But its not confirmed yet.');
                    $message = sprintf('Hi , Can you check the order Id: %s', $shopOrder->id);
                    $this->shopWhatsUp($message);
                }




            }else{
                $this->say(sprintf("Sorry we can't find any order with #%s. You can contact shop throug whatsapp for fast response. click below button to done this", $orderNumber));
                $message = sprintf('Hi , i can\'t find my order with id:%s', $orderNumber);
                $this->shopWhatsUp($message);
            }

        });
    }


    public function deliveries($isHome = 1){
        $shopDelivery = \App\Models\ShopDelivery::where(
            [
                "shop_id" => $this->shop->id,
                "need_cust_loc" => $isHome,
            ]
        )->get();

        $message= BotManController::view('botMan/shop/deliveries', [
            "shopDelivery" => $shopDelivery,
            "shop" => $this->shop,
            "isHome" => $isHome,
        ]);

        $this->say("{$message}");
        $this->reStartFromBegin();

    }

    public function adminHelp($buttons = []){
        $buttons[] = Button::create("How can i change my shop theme")->value("change_shop_theme");
        $buttons[] = Button::create("Home to change/add shop home page banner")->value("change_banner");
        $buttons[] = Button::create("Can i add product without category")->value("product_without_category");
        $buttons[] = Button::create("How can i  add/change About us & terms page")->value("add_cms");
        $buttons[] = Button::create("Where i can found my orders")->value("my_orders");
        $buttons[] = Button::create("How much coins i earned")->value("my_coins");
        $buttons[] = Button::create("Where i can apply my coupon code")->value("my_coupons");
        $buttons[] = Button::create("How can i change my shop information")->value("change_shop_info");
        $buttons[] = Button::create("How can i renew my subscription")->value("renew_subscription");

        $question = Question::create("Please choose any of the options below")
        ->addButtons($buttons);

        $this->ask($question, [
            [
                'pattern' => 'product_without_category',
                'callback' => function (){
                    $message= BotManController::view('botMan/shop/productWithoutCategory', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'change_shop_theme',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/changeShopTheme', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'change_banner',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/changeShopBanner', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'add_cms',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/addChangeCms', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'my_orders',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/myOrders', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'my_coins',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/myCoins', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'my_coupons',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/myCoupons', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'change_shop_info',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/changeShopInfo', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
            [
                'pattern' => 'renew_subscription',
                'callback' => function () {
                    $message= BotManController::view('botMan/shop/renewShopSubscription', [
                        "auth" => Auth::user()
                    ]);

                    $this->say("{$message}");
                    $this->reStartFromBegin(true);
                }
            ],
        ]);
    }


    public function reStartFromBegin($contactUs = false){
        $buttons = [
            Button::create('Go Back')->value('restart'),
            Button::create('End Chat')->value('bye'),
        ];
        if($contactUs){
            $buttons[] = Button::create('Contact Us')->value('contact_us');
        }
        $question = Question::create('Please choose an option')
        ->addButtons($buttons);

        $this->ask($question, [
            [
                'pattern' => 'restart',
                'callback' => function () {
                    $this->startShopChat();
                }
            ],
            [
                'pattern' => 'contact_us',
                'callback' => function () {
                    $this->contactUsLink();
                }
            ],
        ]);

    }

    public function contactUsLink(){

        $question = Question::create('Click below button to know the possible methods to conact us')
        ->callbackId('contact_us_service')
        ->addButtons([
            Button::create('Contact Us')->value('contact us')->additionalParameters(['redirect' => "contact-us"]), // Here we want to add URL which should be redirect on new page after click
        ]);

        $this->say($question);
        $this->reStartFromBegin();
    }

    public function shopWhatsUp($message=""){

        $message = $message ? sprintf('?text=%s', $message) : "";
        $question = Question::create(sprintf('You can contact %s throug whatsapp for fast response. click below button to done this', $this->shop->name))
        ->callbackId('whatsap_us_service')
        ->addButtons([
            Button::create('Whatsup')->value('whatsup')->additionalParameters(['url' => 'https://wa.me/'.$this->shop->phone.$message]), // Here we want to add URL which should be redirect on new page after click
        ]);

        $this->say($question);
        $this->reStartFromBegin();
    }





    public function run()
    {
        // This will be called immediately
        $this->startShopChat();
    }
}


