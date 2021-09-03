<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;

class HelpTicketController extends Controller
{


    public function types(Request $request){
        $types = \App\Models\HelpTicketType::all();
        return response($types);
    }

    public function tickets(Request $request){
        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }
        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);


        $tickets = \App\Models\HelpTicket::with(["helpTicketType"])->where("shop_id", $shop->id)->latest()->get();
        return response($tickets);
    }

    public function saveTicket(Request $request){
        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }
        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);

        $validator = Validator::make($request->all(), [
            'subject' => ['required', 'string'],
            'reason' => ['required', 'string'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }



        $ticket = new \App\Models\HelpTicket;
        $ticket->help_ticket_type_id = $request->input("type", null);
        $ticket->shop_id = $shop->id;
        $ticket->subject = $request->input("subject", null);
        $ticket->content = $request->input("reason", null);
        $ticket->status = 0;
        $ticket->save();

        $emailJob = (new \App\Jobs\TicketCreated($ticket))->delay(Carbon::now()->addSeconds(2));
        dispatch($emailJob);

        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);
    }




}
