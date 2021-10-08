<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopMessageController extends Controller
{


    public function latestMsgs(Request $request){
        $shop = null;
        $shopKey = $request->header('shopKey');
        $shopKey = ( $shopKey ) ?  $shopKey  :$request->input("shop_key");
        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }
        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }

        $messages = \App\Models\ShopMessage::with(["prefillMessage"])->where("shop_id",  $shop->id)->latest()->take(7)->get();
        return response($messages);
    }




}
