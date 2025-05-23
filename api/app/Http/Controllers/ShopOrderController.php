<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Http\Resources\ShopOrderResurce;
use App\Mail\ShopMobileIsNotVerifiedNotification;
use App\Mail\ShopHasNoDeliveryPointsNotification;
use Mail;
use Cache;
use Carbon\Carbon;

class ShopOrderController extends Controller
{


    public function createOrder(Request $request){

        $need_cust_loc = $request->input("selectedLocation.need_cust_loc", null);
        $isApps = $request->header('IsApps');
        $isApps = (isset($isApps) && $isApps) ? $isApps : null;
        if($isApps){
            $validationArr = [
                'cart' => ['required']
            ];
        }else{
            $validationArr = [
                'name' => ['required'],
                'phone' => ['required', 'regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im'],
                'cart' => ['required'],
                'selectedLocation' => ['required'],
            ];
        }


        if($need_cust_loc || $need_cust_loc === null){
            $validationArr["address"] = ["required"];
            $validationArr["pin"] = ["required"];
        }
        $shop = null;
        $shop = $request->input('x_shop', null);

        if(!$shop){
            $validationArr["x_shop"] = ["required"];
        }



        if(!$shop->is_mobile_verified){
            $shopMobileNotVerifiedNoti = Cache::get('shopMobileNotVerifiedNoti_'.$shop->id);


            if($shop->email && !$shopMobileNotVerifiedNoti){
                try{
                    $expiresAt = Carbon::now()->addDays(2);
                    Cache::put('shopMobileNotVerifiedNoti_'.$shop->id, 1, $expiresAt);

                    Mail::to($shop->email)->send(new ShopMobileIsNotVerifiedNotification($shop));
                }catch (\Swift_TransportException $e) {
                    return response(["message" => 'Caught exception: '.  $e->getMessage(), "status" => false], 500);
                }
            }
            return response(['message' => sprintf('%s\'s mobile is not verified', $shop->name), "status" => false], 424);
        }

        if(!$shop->shopDelivery->count()){
            $shopHasNoDeliveryPointsNoti = Cache::get('shopHasNoDeliveryPointsNoti_'.$shop->id);

            if($shop->email && !$shopHasNoDeliveryPointsNoti){
                try{
                    $expiresAt = Carbon::now()->addDays(2);
                    Cache::put('shopHasNoDeliveryPointsNoti_'.$shop->id, 1, $expiresAt);

                    Mail::to($shop->email)->send(new ShopHasNoDeliveryPointsNotification($shop));
                }catch (\Swift_TransportException $e) {
                    return response(["message" => 'Caught exception: '.  $e->getMessage(), "status" => false], 500);
                }
            }
            return response(['message' => sprintf('%s\'s has no delivery / pickup point', $shop->name), "status" => false], 424);
        }
        $validator = Validator::make($request->all(), $validationArr,[],[
            'selectedLocation' => 'Delivery Location',
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shopDelivery = \App\Models\ShopDelivery::find($request->input("selectedLocation.id", 0));
        if($shopDelivery->min_amount > $request->input("grad_total", 0)){
            return response(['message' => 'Validation errors', 'errors' =>["selectedLocation" => sprintf("%s has atleast %d amount order", $shopDelivery->name, $shopDelivery->min_amount )]  , 'status' => false], 422);
        }





        //return response([$shop->country->phonecode], 422);
        if($shop){
            $phone = $request->input("phone", '');

            if($shop->country && $shop->country->phonecode && $phone){
                if(strlen($phone) == 10 && $shop->country->phonecode == '91'){
                    $phone = $shop->country->phonecode.$phone;
                }
            }else{
                if(strlen($phone) == 10 && !$isApps){
                    $phone = '91'.$phone;
                }
            }
            $phone = ($phone) ? $phone : ' ';
            $shopCustomer = \App\Models\ShopCustomer::updateOrCreate(
                [
                    "name" => $request->input("name", ''),
                    "email" => $request->input("email", ''),
                    "phone" => $phone,
                    "shop_id" => $shop->id,
                ],
                [
                    "name" => $request->input("name", ''),
                    "email" => $request->input("email", ''),
                    "phone" => $phone,
                    "shop_id" => $shop->id,
                ]
            );

            if($shopCustomer->id){
                $delivery_date = null;
                if($request->input("delivery_date", null))
                    $delivery_date = \Carbon\Carbon::createFromFormat("d/m/Y",$request->input("delivery_date"))->format('Y-m-d H:i:s');


                $shopOrder = new \App\Models\ShopOrder;
                $shopOrder->shop_id =  $shop->id;
                $shopOrder->delivery_at =  $delivery_date;
                $shopOrder->shop_customer_id =  $shopCustomer->id;
                $shopOrder->shop_delivery_id =  ($shopDelivery) ? $shopDelivery->id : 0;
                $shopOrder->delivery_chage =  ($shopDelivery) ? $shopDelivery->charge : 0;
                $shopOrder->address =  $request->input("address", '');
                $shopOrder->pin =  $request->input("pin", '');
                $shopOrder->note =  $request->input("note", '');
                $shopOrder->loc =  $request->input("loc", null);
                $shopOrder->delivery_slot =  $request->input("delivery_slot", null);
                $shopOrder->loc = json_encode($shopOrder->loc);
                if($isApps){
                    $shopOrder->status = 5;
                }
                $shopOrder->total =  $request->input("grad_total", 0);
                $shopOrder->web_push_token =  $request->input("token", '');
                $shopOrder->save();


                $shopOrder->shopCustomer->web_push_token = $shopOrder->web_push_token;
                $shopOrder->shopCustomer->save();

                $totalPrice = 0;
                if($shopOrder->id){
                    $cart = $request->input("cart", null);
                    if(is_array($cart) && !empty($cart)){
                        foreach($cart as $crt){
                            if($crt["product"]["shop_product_selected_variant"]["id"]){
                                $shopProductVarient = \App\Models\ShopProductVariant::find($crt["product"]["shop_product_selected_variant"]["id"]);
                                if($shopProductVarient->id){
                                    $shopOrderItem = new \App\Models\ShopOrderItem;
                                    $shopOrderItem->shop_order_id = $shopOrder->id;
                                    $shopOrderItem->shop_product_variant_id = $crt["product"]["shop_product_selected_variant"]["id"];
                                    $shopOrderItem->qty = $crt["qty"];
                                    $shopOrderItem->message = $crt["message"];
                                    $shopOrderItem->price = $crt["qty"] * $shopProductVarient->price;
                                    $shopOrderItem->save();
                                    $totalPrice += $shopOrderItem->price;
                                }

                            }

                        }
                    }
                    $totalPrice += $shopOrder->delivery_chage;
                    $shopOrder->total =  $totalPrice;
                    $shopOrder->save();


                    if($shopOrder){
                        event(new \App\Events\OrderCreatedEvent($shopOrder));
                    }

                    return response(\App\Models\ShopOrder::with(["shopCustomer"])->find($shopOrder->id) );
                }else{
                    return response(['message' => 'sorry order cant\'t be created', 'status' => false], 422);
                }
            }else{
                return response(['message' => 'sorry customer can\t be added', 'status' => false], 422);
            }
        }else{
            return response(['message' => 'sorry shop is unavailable', 'status' => false], 422);
        }
        return response(['message' => 'successfully placed order', 'status' => 1]);
    }

    public function orders(Request $request){
        $perPage = $request->input("pageSize", 20);
        $shop = null;
        $shop = $request->input('x_shop', null);

        $orders = \App\Models\ShopOrder::with(["shopCustomer", "shopOrderItem.ShopProductVariant.shopProduct", "shopDelivery"])
        ->where("shop_id", $shop->id);

        if($request->input("q", '')){
            $orders = $orders->where( function( $query ) use($request){
                $query->orWhereHas("shopCustomer", function($qry) use($request){
                    $q = $request->input("q", '');
                    $qry->where("name", 'like', "%{$q}%");
                });

                $query->orWhereHas("shopOrderItem.shopProductVariant.shopProduct", function($qry) use($request){
                    $q = $request->input("q", '');
                    $qry->where("name", 'like', "%{$q}%");
                });
                $q = $request->input("q", '');
                $query->orWhere("id", $q);
            });
        }

        if($request->input("start_date", '') && $request->input("end_date", '')){
            $orders = $orders->whereBetween("created_at", [$request->input("start_date", ''), $request->input("end_date", '')]);
        }

        if($request->input("status", '')){
            $orders = $orders->whereIn("status", $request->input("status", []));
        }

        return response($orders->orderBy('status', 'asc')->orderBy("id", "desc")->paginate($perPage));
    }

    public function changeStatus(Request $request){
        $validator = Validator::make($request->all(), [
            'status' => ['required', 'between:1,5'],
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $isChanged = false;
        $shopOrder = \App\Models\ShopOrder::find($request->input("id"));
        $shopOrder->status = $request->input("status", 1);
        if($shopOrder->isDirty("status")){
            $isChanged = true;
        }
        $shopOrder->save();

        if($isChanged && $shopOrder->web_push_token){
            event(new \App\Events\OrderChangedEvent($shopOrder));
        }




        return response(['message' => 'Successfully changed status', 'status' => true]);
    }

    public function showOrderDetail(Request $request){
        $shop = null;
        $shop = $request->input('x_shop', null);

        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }



        $id =  $request->input("id", null);
        $shopOrder = \App\Models\ShopOrder::with(["shopCustomer", "shopDelivery", "shopOrderItem.shopProductVariant.shopProduct", "shopOrderItem.shopProductVariant.shopProductImage"])
        ->where("sec_key", $id)
        ->where("shop_id", $shop->id)
        ->get()->first();
       // $shopOrder->shop_customer->phone = "asas";
        //  $phone_number = '******' . substr( $phone_number, - 4);
        //   return response($shopOrder);
        return response(new ShopOrderResurce($shopOrder));
    }

}
