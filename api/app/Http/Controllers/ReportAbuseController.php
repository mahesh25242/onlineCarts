<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Events\ShopStatusChangeEvent;

class ReportAbuseController extends Controller
{


    public function types(Request $request){
        $reportAbuseTypes = \App\Models\ReportAbuseType::get();
        return response($reportAbuseTypes);
    }


    public function save(Request $request){
        $shop = $request->input('x_shop', null);

        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);

        $reportAbuseExists = \App\Models\ReportAbuse::where("ip", $request->ip())
        ->where("shop_id", $shop->id)->exists();

        if(!$reportAbuseExists && ($request->input('comment', null) || $request->input('report_abuse_type_id', null))){
            $reportAbuse = new \App\Models\ReportAbuse;
            $reportAbuse->report_abuse_type_id = $request->input('report_abuse_type_id', null);
            $reportAbuse->name = $request->input('name', null);
            $reportAbuse->url = $request->input('url', null);
            $reportAbuse->content = $request->input('content', null);
            $reportAbuse->shop_product_id = $request->input('shop_product_id', null);
            $reportAbuse->shop_id = $shop->id;
            $reportAbuse->save();

            $shopReportAbuse = \App\Models\ReportAbuse::where("shop_id", $shop->id)->whereDoesntHave("shop.shopIdProop", function($q) {
                $query->where('status',  1);
            })->count();

            $shopBlockReportAbuseCount = \App\Models\Setting::where("name", "shop_block_report_abuse_count")->get()->first();
            $blockCount = ($shopBlockReportAbuseCount->value > 0) ? $shopBlockReportAbuseCount->value : 10;

            if($shopReportAbuse == $blockCount){
                $reportAbuse->shop->status = 0;
                $reportAbuse->shop->save();

                event(new ShopStatusChangeEvent($reportAbuse->shop, ["pmn" => "shop report abuse blocking" ]));

            }
        }else{
            if($reportAbuseExists){
                return response([ 'message' => 'Already submited abuse to this shop', 'status' => false], 422);
            }
            return response([ 'message' => 'comment or abuse id is missing', 'status' => false], 422);
        }

        return response([ 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function shopAbuses(Request $request){
        $shop = $request->input('x_shop', null);

        if(!$shop)
            return response(["message" => "Page not found", "status" =>0], 404);

        $perPage = $request->input("perPage", 50);

        $perPage = (is_numeric($perPage) && $perPage> 0) ? $perPage : 50;
        $reportAbuse = \App\Models\ReportAbuse::with(["shopProduct.shopProductCategory", "reportAbuseType"])
        ->where("shop_id", $shop->id)->latest()->paginate($perPage);
        return response( $reportAbuse);
    }

    public function abuses(Request $request){
        $perPage = 50;
        $reportAbuse = \App\Models\ReportAbuse::with(["shopProduct.shopProductCategory", "reportAbuseType", "shop"])->latest()->paginate($perPage);
        return response( $reportAbuse);
    }

}
