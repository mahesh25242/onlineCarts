<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;

class PackageController extends Controller
{


    public function packages(Request $request){
        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }


        $packages = new \App\Models\Package;
        if($shop){
            $packages = $packages->where("status", 1)->where("price",'>', 0);
        }else if($request->input("status",0)){
            $packages = $packages->where("status", $request->input("status", 0));
        }



        return response($packages->get());
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required'],
            'duration' => ['required'],
            'status' => ['required'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if($request->input("id", null)){
            $package = \App\Models\Package::find($request->input("id", null));
        }else{
            $package = new \App\Models\Package;
        }

        $package->name = $request->input("name", '');
        $package->description = $request->input("description", '');
        $package->price = $request->input("price", '');
        $package->duration = $request->input("duration", '');
        $package->status = $request->input("status", '');
        $package->save();

        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);

    }




}
