<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ShopDeliveryController extends Controller
{


    public function deliveries(Request $request){
        $shop = $request->input('x_shop', null);
        $shopId = ($shop) ? $shop->id : 0;

        $deliveries = \App\Models\ShopDelivery::where("shop_id", $shopId)
        ->orderBy("sortorder", "ASC")->get();
        $slots = \App\Models\ShopDeliverySlot::where("shop_id", $shopId)
        ->orderBy("sortorder", "ASC")->get();

        return response([
            "deliveries" => $deliveries,
            "slots" => $slots,
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'charge' => ['required'],
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shop = $request->input('x_shop', null);



        $deliveryInput = [
            "name" => $request->input("name", ''),
            "description" => $request->input("description", ''),
            "charge" => $request->input("charge", 0),
            "sortorder" => $request->input("sortorder", 0),
            "min_amount" => ($request->input("min_amount", 0) ? $request->input("min_amount", 0) : 0) ,
            "need_cust_loc" => boolval($request->input("need_cust_loc", 0)),
            "map_url" => $request->input("map_url", ''),
            "address" => $request->input("address", ''),
        ];
        if($request->input("id", 0)){
            \App\Models\ShopDelivery::where('id', $request->input("id", 0))->update($deliveryInput);
            $shopDelivery = \App\Models\ShopDelivery::find($request->input("id", 0));
        }else{
            $deliveryInput["shop_id"] = ($shop) ? $shop->id : 0;
            $shopDelivery = \App\Models\ShopDelivery::create($deliveryInput);
        }
        return response(['data' => $shopDelivery, 'message' => 'successfully saved!', 'status' => true]);
    }

    public function delete(Request $request){
        $shop = $request->input('x_shop', null);
        $id = $request->input("id", 0);

        $condition = [
            "id" => $id
        ];
        if($shop ){
            $condition["shop_id"] = $shop->id;
        }
        if($id){
            $shopDelivery = \App\Models\ShopDelivery::where($condition)->delete();
        }
        return response(['message' => 'successfully deleted!', 'status' => true]);
    }




}
