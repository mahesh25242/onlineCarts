<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class ActiveShopMiddleWare
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
        $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();

        if($shop->status){
            return $next($request);
        }


        return response( $shop->shopStatusMessage, 402);
    }
}
