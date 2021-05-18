<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ThemesController extends Controller
{


    public function index(){
        $themes = \App\Models\Theme::all();
        return response($themes);
    }


    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'theme_id' => ['required']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shopKey = $request->header('shopKey');
        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input('shop_key');
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }


        if($shop){
            $theme_id = $request->input("theme_id", 0);
            \App\Models\ShopTheme::updateOrCreate(
                [
                    "shop_id" => $shop->id,
                ],
                [
                    "shop_id" => $shop->id,
                    "theme_id" => $theme_id
                ]
            );
        }

        return response(['message' => 'success', 'status' => true]);
    }


}
