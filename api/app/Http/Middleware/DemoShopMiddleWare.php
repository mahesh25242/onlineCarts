<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class DemoShopMiddleWare
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

        $user = \App\Models\User::has("isSuperUser")->find(Auth::id());

        if(!$shop->is_default || $user){
            return $next($request);
        }

        return response( [
            "message" => 'its a demo shop can\'t create or update any data'
        ], 423);
    }
}
