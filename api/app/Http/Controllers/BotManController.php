<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BotMan\OnStartConversation;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;

use BotMan\BotMan\BotMan;
use BotMan\BotMan\BotManFactory;
use BotMan\BotMan\Drivers\DriverManager;
use BotMan\BotMan\Cache\LaravelCache;



class BotManController extends Controller
{


    public function index(Request $request){
        $config = [
            // Your driver-specific configuration
            "driver" => "web",
        ];
         // Load the driver(s) you want to use
         DriverManager::loadDriver(\BotMan\Drivers\Web\WebDriver::class);

        // $config = [
        //     'telegram' => [
        //         'token' => '2059906531:AAHwAzYuSmPZtqdioCJ5ZgFYDX3b2m9mBiM',
        //     ]
        // ];

        // DriverManager::loadDriver(\BotMan\Drivers\Telegram\TelegramDriver::class);


        // Create an instance
        $botman = BotManFactory::create($config, new LaravelCache());

        $botman->hears(['hello', 'hi'], BotManController::class.'@startConversation');




        $botman->fallback(function($bot) {


        //print_r($bot->getMessage()->getPayload());

            $bot->reply('Sorry, I did not understand these commands. Please type <b>hi</b> to start chat');
        });

        $botman->hears(['stop', 'bye', 'thanks', 'exit'], function(BotMan $bot) {
            $bot->reply('bye. Have a nice day.');
        })->stopsConversation();

        $botman->hears(['wru', 'who are you', 'who', 'you'], function(BotMan $bot) {
            $bot->reply('I am your Assistant. My name is Ocia');
        })->stopsConversation();

        // Start listening
        $botman->listen();
    }



    public static function timeGreetings(){
        $greetings = "";

        /* This sets the $time variable to the current hour in the 24 hour clock format */
        $time = date("H");

        /* Set the $timezone variable to become the current timezone */
        $timezone = date("e");

        /* If the time is less than 1200 hours, show good morning */
        if ($time < "12") {
            $greetings = "Good morning";
        } else

        /* If the time is grater than or equal to 1200 hours, but less than 1700 hours, so good afternoon */
        if ($time >= "12" && $time < "17") {
            $greetings = "Good afternoon";
        } else

        /* Should the time be between or equal to 1700 and 1900 hours, show good evening */
        if ($time >= "17" && $time < "19") {
            $greetings = "Good evening";
        } else

        /* Finally, show good night if the time is greater than or equal to 1900 hours */
        if ($time >= "19") {
            $greetings = "Good night";
        }

        return $greetings;
    }

    public function startConversation($bot){
        $bot->startConversation(new OnStartConversation);
    }





}
