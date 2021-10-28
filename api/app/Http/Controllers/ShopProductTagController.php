<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ShopProductTagController extends Controller
{


    public function index(Request $request){
        $shop = $request->input('x_shop', null);

        $shopProductTag = \App\Models\ShopProductTag::where("shop_category_id", $shop->shop_category_id)->get();
        return response($shopProductTag);
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

        $shop = $request->input('x_shop', null);
        $input["shop_category_id"] = $shop->shop_category_id;

        $shopCategory = \App\Models\ShopProductTag::updateOrCreate(
            [
                "shop_category_id" => $shop->shop_category_id,
                "name" => $request->input("name", null)
            ]
        );

        return response(['data' => $shopCategory, 'message' => 'Successfully created tag!', 'status' => true]);
    }


}
