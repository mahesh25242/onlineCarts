<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class AdminAndShopAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $shopKey = $request->header('shopKey');
        if($shopKey){
            $exists = \App\Models\User::whereHas("userRole.shop", function($q) use($shopKey){
                $q->where("shop_key", $shopKey);
            })->where("status", 1)->where("id", Auth::id())->exists();
            if($exists){

                $pushToken = $request->header('Push-Token');
                if($pushToken){
                    $checkCount = \App\Models\ShopUserPushToken::where("user_id",Auth::id())->count();

                    $shopUserPushToken = \App\Models\ShopUserPushToken::where("web_push_token", $pushToken)->get()->first();
                    if(!$shopUserPushToken){
                        if($checkCount <= 3){
                            $shopUserPushToken = new \App\Models\ShopUserPushToken;
                            $shopUserPushToken->user_id = Auth::id();
                            $shopUserPushToken->web_push_token = $pushToken;
                            $shopUserPushToken->save();
                        }else{
                            $shopUserPushToken = \App\Models\ShopUserPushToken::where("user_id",Auth::id())->get()->first();
                            $shopUserPushToken->user_id = Auth::id();
                            $shopUserPushToken->web_push_token = $pushToken;
                            $shopUserPushToken->save();
                        }
                    }

                }

                return $next($request);
            }

        }

        if (Auth::check() )
        {
            if(\App\Models\User::find(Auth::id())->isSuperAdmin()->exists())
                return $next($request);

            $xShop = $request->input('x_shop', null);
            $isApps = $request->header('IsApps');
            if($isApps){
                $user = \App\Models\User::find(Auth::id());
                if($user->userRole->count() && $user->userRole->first()->shop()->count() &&
                $user->userRole->first()->shop()->get()->first()->shop_key){
                    $request->headers->set('shopKey', $user->userRole->first()->shop()->get()->first()->shop_key);
                    if(!$xShop)
                        $request->merge(["x_shop"=> $user->userRole->first()->shop()->get()->first()]);
                    return $next($request);
                }
            }


        }
        return response('Unauthorized naither admin nor shop.', 401);
    }
}
