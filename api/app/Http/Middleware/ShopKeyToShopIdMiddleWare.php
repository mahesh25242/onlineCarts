<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class ShopKeyToShopIdMiddleWare
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
        $xShop = $request->input('x_shop', null);

        if(!$xShop  && $shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
            $request->merge(["x_shop"=> $shop]);
        }


        return $next($request);
    }
}
