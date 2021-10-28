<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CMSController extends Controller
{


    public function pages(Request $request){
        $shop = $request->input('x_shop', null);
        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);

        $cms = \App\Models\Cms::where("shop_id", $shop->id)->get();
        return response($cms);
    }


    public function store(Request $request){
        $shop = $request->input('x_shop', null);
        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);

        $cms = \App\Models\Cms::where("shop_id", $shop->id)->where("id", $request->input("id", 0))->get()->first();
        if(!$cms){
            $cms = new \App\Models\Cms;
        }
        $cms->name = $request->input("name", null);
        $cms->content = $request->input("content", null);
        $cms->status = $request->input("status", null);
        $cms->url = $request->input("url", null);
        $cms->shop_id = $shop->id;
        $cms->save();
        return response(["message" => "Successfully saved", "status" => 1]);
    }


}
