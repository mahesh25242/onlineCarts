<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Carbon\Carbon;

class ShopPointController extends Controller
{


    public function points(Request $request){
        $shop = null;
        $shop = $request->input('x_shop', null);
        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }

        return response($shop->shopPoint);
    }


    public function redeemPoints(Request $request){
        $shop = null;
        $shop = $request->input('x_shop', null);
        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }


        $validator = Validator::make($request->all(), [
            'code' => ['required'],
        ]);



        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $code = $request->input("code", '');
        $time = \Carbon\Carbon::now();

        $pointCoupon = \App\Models\PointCoupon::where("code", $code)
        ->whereRaw("
                    (
                        (
                            start_date IS NOT NULL  AND end_date IS NOT NULL
                            AND
                            '{$time}' BETWEEN start_date AND end_date
                        ) OR
                        (
                            start_date IS NOT NULL
                            AND end_date IS NULL
                            AND
                            start_date < '{$time}'
                        ) OR
                        (
                            end_date IS NOT NULL
                            AND start_date IS NULL
                            AND
                            end_date > '{$time}'
                        )
                        OR
                        (
                            start_date IS  NULL AND end_date IS  NULL
                        )
                    )
                ")
        ->where(function($query) use($shop) {
            $query->orWhere('shop_id', $shop->id)
                ->orWhere('shop_id', 0);
        })->get()->first();
        if(!$pointCoupon){
            return response(['message' => 'Validation errors', 'errors' =>  ["code" => ["Please enter a valid code"]], 'status' => false], 422);
        }

        $pointCouponTrackCount = \App\Models\PointCouponTrack::where("point_coupon_id", $pointCoupon->id)->count();
        if($pointCouponTrackCount >= $pointCoupon->no_use){
            return response(['message' => 'Validation errors', 'errors' =>  ["code" => ["Code reached maximum usage"]], 'status' => false], 422);
        }


        $pointCouponTrackShopUseCount = \App\Models\PointCouponTrack::where([
            "point_coupon_id" => $pointCoupon->id,
            "shop_id" => $shop->id,
        ])->count();

        if($pointCouponTrackShopUseCount >= $pointCoupon->per_shop_use){
            return response(['message' => 'Validation errors', 'errors' =>  ["code" => ["Code reached {$shop->name}'s maximum usage"]], 'status' => false], 422);
        }

        $shopUsedCouponCount = \App\Models\PointCouponTrack::where([
            "shop_id" => $shop->id,
        ])->count();

        if($shopUsedCouponCount && $pointCoupon->fresh_use){
            return response(['message' => 'Validation errors', 'errors' =>  ["code" => ["This code can only used for new shops"]], 'status' => false], 422);
        }
        $shopPoint = \App\Models\ShopPoint::where("shop_id", $shop->id)->get()->first();
        if($shopPoint){
            $shopPoint->points += $pointCoupon->point;
        }else{
            $shopPoint = new \App\Models\ShopPoint;
            $shopPoint->points = $pointCoupon->point;
            $shopPoint->shop_id =$shop->id;
        }

        $shopPoint->save();

        $ShopPointTran  = new \App\Models\ShopPointTran;
        $ShopPointTran->shop_point_id = $shopPoint->id;
        $ShopPointTran->point = $pointCoupon->point;
        $ShopPointTran->save();

        $pointCouponTrack = new \App\Models\PointCouponTrack;
        $pointCouponTrack->point_coupon_id = $pointCoupon->id;
        $pointCouponTrack->shop_id = $shop->id;
        $pointCouponTrack->shop_point_tran_id = $ShopPointTran->id;
        $pointCouponTrack->save();

        return response([
            "message"=> "Successfully redeem the points",
            "success" => true
        ]);
    }


}
