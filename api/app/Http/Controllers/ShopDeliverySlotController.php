<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ShopDeliverySlotController extends Controller
{


    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }



        $shop = $request->input('x_shop', null);

        $deliverySlotInput = [
            "name" => $request->input("name", ''),
            "is_default" => $request->input("is_default", 0),
            "sortorder" => $request->input("sortorder", 0)
        ];
        if($request->input("id", 0)){
            \App\Models\ShopDeliverySlot::where('id', $request->input("id", 0))->update($deliverySlotInput);
            $shopDeliverySlot = \App\Models\ShopDeliverySlot::find($request->input("id", 0));
        }else{
            $deliverySlotInput["shop_id"] = ($shop) ? $shop->id : 0;
            $shopDeliverySlot = \App\Models\ShopDeliverySlot::create($deliverySlotInput);
        }
        return response(['data' => $shopDeliverySlot, 'message' => 'successfully saved!', 'status' => true]);
    }

    public function delete(Request $request){
        $id = $request->input("id", 0);
        $shop = $request->input('x_shop', null);
        $condition = [
            "id" => $id
        ];
        if($shop->id){
            $condition["shop_id"] = $shop->id;
        }
        if($id){
            $shopDeliverySlot = \App\Models\ShopDeliverySlot::where($condition)->delete();
        }
        return response(['message' => 'successfully deleted!', 'status' => true]);
    }




}
