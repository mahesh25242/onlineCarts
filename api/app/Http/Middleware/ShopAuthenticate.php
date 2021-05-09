<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class ShopAuthenticate
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
            $user = \App\User::whereHas("userRole.shop", function($q) use($shopKey){
                $q->where("shop_key", $shopKey);
            })->where("status", 1)->where("id", Auth::id())->get()->first();
            if($user->userRole->shop->status)
                return $next($request);
        }
        return response('Unauthorized.', 401);
    }
}
