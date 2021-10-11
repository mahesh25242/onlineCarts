<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ShopProductVarientTagController extends Controller
{


    public function index(Request $request){
        $shopKey = $request->header('shopKey');
        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key", '');
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }

        $shopProductVarientTag = \App\Models\ShopProductVariantTag::where("shop_category_id", $shop->shop_category_id)->get();
        return response($shopProductVarientTag);
    }


    public function store(Request $request){
        $validationField = [
            'name' => ['required'],
        ];



        $validator = Validator::make($request->all(), $validationField);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $input = $request->all();
        $shopKey = $request->header('shopKey');
        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
            $shopId = ($shop) ? $shop->id : 0;
        }else{
            $shopKey = $request->input("shop_key", '');
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
            $shopId = ($shop) ? $shop->id : 0;
        }
        $input["shop_category_id"] = $shop->shop_category_id;

        $shopCategory = \App\Models\ShopProductVariantTag::updateOrCreate(
            [
                "shop_category_id" => $shop->shop_category_id,
                "name" => $request->input("name", null)
            ]
        );

        return response(['data' => $shopCategory, 'message' => 'Successfully created tag!', 'status' => true]);
    }


}
