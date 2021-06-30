<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Storage;


class ShopBannerController extends Controller
{

    public function banners(Request $request){
        $shopKey = $request->header('shopKey');

        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key");

        if($shopKey){
            if(Storage::disk('public')->exists("shop/{$shopKey}/general/home-banner.json")){
                return response(Storage::disk('public')->get("shop/{$shopKey}/general/home-banner.json"));
            }else{
                return response(['message' => 'no banner found', 'status' => false], 404);
            }
        }else{
            return response(['message' => 'No data found!', 'status' => false]);
        }
    }

    public function save(Request $request){
         $shopKey = $request->header('shopKey');

        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key");
        if($shopKey){
            $idx = $request->input("idx", 0);
            $idx = ($idx && is_numeric($idx)) ? $idx : 0;

            $imageName = sprintf("%s.%s",time(), $request->file('image')->extension());
            $request->file('image')->move("assets/shop/{$shopKey}/general", $imageName);

            if(Storage::disk('public')->exists("shop/{$shopKey}/general/home-banner.json")){
                $json= Storage::disk('public')->get("shop/{$shopKey}/general/home-banner.json");
                $json = json_decode($json, true);

                if(isset($json[$idx]) && isset($json[$idx]["image"]) &&
                Storage::disk('public')->exists("shop/{$shopKey}/general/".$json[$idx]["image"])){
                    Storage::disk('public')->delete("shop/{$shopKey}/general/".$json[$idx]["image"]);
                }

                $json[$idx] = array(
                        "image" => url("assets/shop/{$shopKey}/general/{$imageName}")
                );
                Storage::disk('public')->put("shop/{$shopKey}/general/home-banner.json", json_encode($json));
                return response(Storage::disk('public')->get("shop/{$shopKey}/general/home-banner.json"));
            }else{

                $json = array(
                    array(
                        "image" => url("assets/shop/{$shopKey}/general/{$imageName}")
                    )
                );

                Storage::disk('public')->put("shop/{$shopKey}/general/home-banner.json", json_encode($json));
            }

        }

        return response(['message' => 'No data found!', 'status' => false]);
    }




}
