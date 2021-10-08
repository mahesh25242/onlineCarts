<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;

class PointCouponController extends Controller
{


    public function coupons(Request $request){
        $perPage = 50;
        $pointCoupon = \App\Models\PointCoupon::with(["shop"])->paginate($perPage);

        return response($pointCoupon);
    }

    public function save(Request $request, $id = 0){

        $validator = Validator::make($request->all(), [
            'no_use' => ['required'],
            'point' => ['required'],
            'status' => ['required'],
        ]);



        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if($id){
            $pointCoupon = \App\Models\PointCoupon::find($id);
        }else{
            $pointCoupon = new \App\Models\PointCoupon;
        }

        $start_date = null;
        if($request->input("start_date", null)){
            $date = sprintf("%d-%d-%d", $request->input("start_date.year", 0), $request->input("start_date.month", 0), $request->input("start_date.day", 0));
            $start_date = \Carbon\Carbon::createFromFormat("Y-m-d",$date)->startOfDay();
        }


        $end_date = null;
        if($request->input("end_date", null)){
            $date = sprintf("%d-%d-%d", $request->input("end_date.year", 0), $request->input("end_date.month", 0), $request->input("end_date.day", 0));
            $end_date = \Carbon\Carbon::createFromFormat("Y-m-d",$date)->endOfDay();
        }



        $pointCoupon->shop_id = $request->input("shop_id", 0) ?? 0;
        $pointCoupon->code = $pointCoupon->code ?? substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 10);
        $pointCoupon->description = $request->input("description", '');
        $pointCoupon->no_use = $request->input("no_use", 0);
        $pointCoupon->point = $request->input("point", 0);
        $pointCoupon->per_shop_use = $request->input("per_shop_use", 1);
        $pointCoupon->fresh_use = $request->input("fresh_use", 0);
        $pointCoupon->start_date = $start_date;
        $pointCoupon->end_date = $end_date;
        $pointCoupon->status = $request->input("status", 0);
        $pointCoupon->save();

        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);
    }

    public function delete($id = 0){
        $pointCoupon = \App\Models\PointCoupon::find($id);
        $pointCoupon->delete();

        return response([
            "success" => 1,
            "message" => 'successfully deleted'
        ]);;
    }

    public function report($id = 0){

        return response([
            "success" => 1,
            "message" => 'successfully deleted'
        ]);;
    }




}
