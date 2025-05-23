<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;
use App\Mail\AdminSubscriptionChangeNotification;
use App\Events\PlanPurchaseEvent;
use App\Http\Resources\PackageResurce;

class PackageController extends Controller
{


    public function packages(Request $request){
        $shop = $request->input('x_shop', null);
        $isFromShop = ($shop) ? true : false;

        $packages = new \App\Models\Package;
        if($isFromShop){
            $packages = $packages->where("status", 1)->where("price",'>', 0);
        }else if($request->input("status",0)){
            $packages = $packages->where("status", $request->input("status", 0));
        }

        return response(PackageResurce::collection($packages->get()) );
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
        $package->plan_id = $request->input("plan_id", '');
        $package->save();

        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);

    }


    public function assignToShop(Request $request){
        $validationArr = [];
        if($request->input("package_id", 0) == '-1'){
            $validationArr = [
                'shop_id' => ['required'],
                'custom_days' => 'required'
            ];
        }else{
            $validationArr = [
                'package_id' => ['required'],
                'shop_id' => ['required']
            ];
        }
        $validator = Validator::make($request->all(), $validationArr);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $shop_id = $request->input('shop_id', 0);
        $package_id = $request->input('package_id', 0);
        $custom_days = $request->input('custom_days', 0);
        $comments = $request->input('comments', '');

        $ShopRenewal = \App\Models\ShopRenewal::where("shop_id", $shop_id)
        ->whereDate('to_date', '>=', Carbon::now())
        ->orderBy("to_date", "DESC")->get()->first();

        if($ShopRenewal){
            $startDay = Carbon::parse($ShopRenewal->to_date)->addDays(1)->startOfDay();
        }else{
            $startDay = Carbon::today()->startOfDay();
        }





        $shopRenewal =  new \App\Models\ShopRenewal;
        if($request->input("package_id", 0) == '-1'){
            $endDay = clone $startDay;

            $shopRenewal->shop_id = $shop_id;
            $shopRenewal->amount = 0;
            $shopRenewal->from_date = $startDay;
            $shopRenewal->to_date = $endDay->addDays($custom_days)->endOfDay();
            $shopRenewal->status = 1;
            $shopRenewal->package_id = 0;
            $shopRenewal->comments = $comments;
            $shopRenewal->save();
        }else{
            $package = \App\Models\Package::find($package_id);
            if($package){
                $endDay = clone $startDay;

                $shopRenewal->shop_id = $shop_id;
                $shopRenewal->amount = $package->price;
                $shopRenewal->from_date = $startDay;
                $shopRenewal->to_date = $endDay->addMonths($package->duration)->endOfDay();
                $shopRenewal->status = 1;
                $shopRenewal->package_id = $package->id;
                $shopRenewal->comments = $comments;
                $shopRenewal->save();
            }
        }
        if($shopRenewal->id){
            $shop = \App\Models\Shop::find($shop_id);
            $shop->status = 1;
            $shop->save();


            if ($request->hasFile('receipt')) {
                $destinationPath = "assets/shop/".$shop->shop_key."/general";
                $extension = $request->file('receipt')->extension();
                $fileName = sprintf("%s.%s", uniqid('recept_'),$extension);

                $request->file('receipt')->move($destinationPath, $fileName);

                $shopRenewal->attachement = $fileName;
                $shopRenewal->save();
            }

            event(new PlanPurchaseEvent($shopRenewal));


        }



        return response([
            "success" => 1,
            "message" => 'successfully saved'
        ]);
    }

}
