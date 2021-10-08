<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class PointCouponTrack extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'point_coupon_id', 'shop_id',
        'shop_point_tran_id'
    ];


    protected $casts = [
        'point_coupon_id' => 'integer',
        'shop_id' => 'integer',
        'shop_point_tran_id' => 'integer'
    ];



    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function pointCoupon()
    {
        return $this->belongsTo('App\Models\PointCoupon');
    }

    public function shopPointTran()
    {
        return $this->belongsTo('App\Models\ShopPointTran');
    }


}
