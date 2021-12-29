<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Razorpay\Api\Api;
use Exception;
use App\Events\PlanPurchaseEvent;
use Carbon\Carbon;

class RazorpayController extends Controller
{

    public function createPackageOrder(Request $request){
        $shop = $request->input('x_shop', null);

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));  
        $package = \App\Models\Package::find($request->input('id', 0));
       
        
        
        $ShopRenewal = \App\Models\ShopRenewal::where("shop_id", $shop->id)
        ->whereDate('to_date', '>=', Carbon::now())
        ->orderBy("to_date", "DESC")->get()->first();

        if($ShopRenewal){
            $startDay = Carbon::parse($ShopRenewal->to_date)->addDays(1)->startOfDay();
        }else{
            $startDay = Carbon::today()->startOfDay();
        }
        $endDay = clone $startDay;

        $shopRenewal =  new \App\Models\ShopRenewal;
       
        $shopRenewal->shop_id = $shop->id;
       
        $shopRenewal->package_id =  $package->id;

        $shopRenewal->from_date = $startDay;
        $shopRenewal->to_date = $endDay->addMonths($package->duration)->endOfDay();
        $shopRenewal->status = 0;
        $shopRenewal->save();

        $points = ($shop && $shop->shopPoint) ? $shop->shopPoint->points : 0;

        $price = $package->price - $points;
        $shopRenewal->coins_used = $points;

        $shopRenewal->amount = $price;
        if($points){            
            $shop->shopPoint->points  = ($price < 0) ? abs($price) :  0;
            $shop->shopPoint->save();
        }
        
        if($price > 0){
            $order = $api->order->create(array(
                'receipt' => $shopRenewal->id,
                'amount' => $price * 100,
                'currency' => 'INR'
                )
            );
    
            $shopRenewal->order_id = $order->id;
            $shopRenewal->save();
            return response([
                'order_id' => $order->id, 
                "amount"=>$package->price * 100,
                'currency' => 'INR',   
                'status' => true
            ]);
        }else{
            $shopRenewal->status = 1;
           
            $shopRenewal->save();
          
            event(new PlanPurchaseEvent($shopRenewal));
            return response([
                'order_id' => 0, 
                "amount"=> 0,
                'currency' => 'INR',   
                'status' => true
            ]);
        }
        

        // $shopRenewal = \App\Models\ShopRenewal::
       
        
        // event(new PlanPurchaseEvent($shopRenewal));

        // print_r($order->id);
        // $payment = $api->payment->fetch("pay_Icr6Io3wpGtOQ8");
       
    }

    public function paymentSuccess(Request $request){        
        
        try
        {
            // Create an object of razorpay class
            $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
            $attributes  = array('razorpay_signature'  => $request->input("razorpay_signature", ''),  'razorpay_payment_id'  => $request->input("razorpay_payment_id", '') ,  'razorpay_order_id' => $request->input("razorpay_order_id", '') );
            $order  = $api->utility->verifyPaymentSignature($attributes);
            $shopRenewal =  \App\Models\ShopRenewal::where("order_id", $request->input("razorpay_order_id", '--'))->get()->first();

            if($shopRenewal){
                $shopRenewal->status = 1;
                $shopRenewal->payment_id = $request->input("razorpay_payment_id", '');
                $shopRenewal->save();
                event(new PlanPurchaseEvent($shopRenewal));
                return  response([
                    "success" => true                    
                ]);
            }else{
                return  response([
                    "success" => false,
                    "e" => $e
                ], 422);
            }

            // $payment = $api->payment->fetch($request->input("razorpay_payment_id", 'pay_IcxUFj1Tj7rndA'));

           
        }
        catch(\Exception $e)
        {
            
            // If Signature is not correct its give a excetption so we use try catch
            return  response([
                "success" => false,                
            ], 503);
        }
    }

}
