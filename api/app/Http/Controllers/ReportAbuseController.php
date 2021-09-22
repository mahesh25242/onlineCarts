<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ReportAbuseController extends Controller
{


    public function types(Request $request){
        $reportAbuseTypes = \App\Models\ReportAbuseType::get();
        return response($reportAbuseTypes);
    }


    public function save(Request $request){

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


        if($request->input('comment', null) || $request->input('report_abuse_type_id', null)){
            $reportAbuse = new \App\Models\ReportAbuse;
            $reportAbuse->report_abuse_type_id = $request->input('report_abuse_type_id', null);
            $reportAbuse->name = $request->input('name', null);
            $reportAbuse->url = $request->input('url', null);
            $reportAbuse->content = $request->input('content', null);
            $reportAbuse->shop_product_id = $request->input('shop_product_id', null);
            $reportAbuse->shop_id = $shop->id;
            $reportAbuse->save();
        }

        return response([ 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function shopAbuses(){
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

        $perPage = $request->input("perPage", 50);

        $perPage = (is_numeric($perPage) && $perPage> 0) ? $perPage : 50;
        $reportAbuse = \App\Models\ReportAbuse::paginate($perPage);
        return response( $reportAbuse);
    }


}
