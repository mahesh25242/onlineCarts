<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\File;

class ThemesController extends Controller
{


    public function index(){
        $themes = \App\Models\Theme::orderBy("name", "ASC")->get();
        return response($themes);
    }


    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'theme_id' => ['required']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shop = $request->input('x_shop', null);


        $theme_id = $request->input("theme_id", 0);

        $theme = \App\Models\Theme::find($theme_id);
        if($shop && $theme){

            \App\Models\ShopTheme::updateOrCreate(
                [
                    "shop_id" => $shop->id,
                ],
                [
                    "shop_id" => $shop->id,
                    "theme_id" => $theme_id
                ]
            );

            $shop->theme_color = $theme->theme_color;
            $shop->bg_color = $theme->background_color;
            $shop->save();
        }

        $http = new \GuzzleHttp\Client;



        // $res = $http->request('POST', url("v1/shop/generateSite"), [
        //     'form_params' => [
        //         "shop_key"=> $request->header("shopkey")
        //     ],
        //     'headers' => [
        //         'Authorization' => $request->header("Authorization"),
        //         'Accept'     => 'application/json',
        //         'shopkey' => $request->header("shopkey"),
        //     ]
        // ]);

        // //$res = $http->send($res);

        // $statusCode = $res->getStatusCode(); // 200
        // if($statusCode == 200){
        //     return $res->getBody();
        // }else{
        //     return response(["success" => false, "message"=> "unexpected error"], 401);
        // }

        return response(['message' => 'success', 'status' => true]);
    }


}
