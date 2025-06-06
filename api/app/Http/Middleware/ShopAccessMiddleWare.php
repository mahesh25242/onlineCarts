<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class ShopAccessMiddleWare
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
            $shop = \App\Models\Shop::where("shop_key",$shopKey)->get()->first();

            if(!$shop)
                return response('Shop is deleted.', 404);

            if($shop->status)
                return $next($request);
            else
                return response('Shop was inactive.', 402);
        }else{
            return $next($request);
        }
    }
}
