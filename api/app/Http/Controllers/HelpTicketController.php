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

    public function allTickets(Request $request){
        $perPage = 50;
        $types = \App\Models\HelpTicket::with(["shop"])->where("parent", 0)->latest()->paginate($perPage);
        return response($types);

    }

    public function replies($id = 0){
        $tktReplies = \App\Models\HelpTicket::with(["shop"])->where("parent", $id)->latest()->get();
        return response($tktReplies);
    }
    public function reply(Request $request, $id = 0){

        if(!$id){
            return response(["message" => "Page not found", "status" =>0], 404);
        }

        $validator = Validator::make($request->all(), [
            'comment' => ['required', 'string'],
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $hlpTkt = \App\Models\HelpTicket::find($id);

        $helpTicket = new \App\Models\HelpTicket;
        $helpTicket->parent = $id;
        $helpTicket->shop_id =  $hlpTkt->shop_id;
        $helpTicket->subject =  $hlpTkt->subject;
        $helpTicket->content =  $request->input("comment", '');
        $helpTicket->status =  0;
        $helpTicket->help_ticket_type_id =  $hlpTkt->help_ticket_type_id;
        $helpTicket->save();
        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);
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


        $tickets = \App\Models\HelpTicket::with(["helpTicketType", "allChildrenReplies"])
        ->where("parent", 0)
        ->where("shop_id", $shop->id)->latest()->get();
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

        if($request->input("id", null)){
            $validator = Validator::make($request->all(), [
                'reason' => ['required', 'string'],
            ]);
        }else{
            $validator = Validator::make($request->all(), [
                'subject' => ['required', 'string'],
                'reason' => ['required', 'string'],
                'type' => ['required'],
            ]);
        }



        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $ticket = new \App\Models\HelpTicket;

        if($request->input("id", null)){
            $replyTicket = \App\Models\HelpTicket::find($request->input("id", null));
            $ticket->parent = $replyTicket->id;
            $ticket->help_ticket_type_id = $replyTicket->help_ticket_type_id;
            $ticket->shop_id = $replyTicket->shop_id;
            $ticket->subject = $replyTicket->subject;
        }else{

            $ticket->help_ticket_type_id = $request->input("type", null);
            $ticket->shop_id = $shop->id;
            $ticket->subject = $request->input("subject", null);
        }

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
