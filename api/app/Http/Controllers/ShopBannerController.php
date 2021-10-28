<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Storage;


class ShopBannerController extends Controller
{

    public function banners(Request $request){
        $shop = $request->input('x_shop', null);


        if($shop->shop_key){
            if(Storage::disk('public')->exists("shop/{$shop->shop_key}/general/home-banner.json")){
                return response(Storage::disk('public')->get("shop/{$shop->shop_key}/general/home-banner.json"));
            }else{
                return response(['message' => 'no banner found', 'status' => false], 404);
            }
        }else{
            return response(['message' => 'No data found!', 'status' => false]);
        }
    }

    public function save(Request $request){
        $shop = $request->input('x_shop', null);


        if($shop->shop_key){
            $idx = $request->input("idx", 0);
            $idx = ($idx && is_numeric($idx)) ? $idx : 0;

            $imageName = sprintf("%s.%s",time(), $request->file('image')->extension());
            $request->file('image')->move("assets/shop/{$shop->shop_key}/general", $imageName);

            if(Storage::disk('public')->exists("shop/{$shop->shop_key}/general/home-banner.json")){
                $json= Storage::disk('public')->get("shop/{$shop->shop_key}/general/home-banner.json");
                $json = json_decode($json, true);

                if(isset($json[$idx]) && isset($json[$idx]["image"]) &&
                Storage::disk('public')->exists("shop/{$shop->shop_key}/general/".$json[$idx]["image"])){
                    Storage::disk('public')->delete("shop/{$shop->shop_key}/general/".$json[$idx]["image"]);
                }

                $json[$idx] = array(
                        "image" => url("assets/shop/{$shop->shop_key}/general/{$imageName}")
                );
                Storage::disk('public')->put("shop/{$shop->shop_key}/general/home-banner.json", json_encode($json));
                return response(Storage::disk('public')->get("shop/{$shop->shop_key}/general/home-banner.json"));
            }else{

                $json = array(
                    array(
                        "image" => url("assets/shop/{$shop->shop_key}/general/{$imageName}")
                    )
                );

                Storage::disk('public')->put("shop/{$shop->shop_key}/general/home-banner.json", json_encode($json));
            }

        }

        return response(['message' => 'No data found!', 'status' => false]);
    }




}
