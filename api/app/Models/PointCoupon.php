<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class PointCoupon extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'code', 'description', 'no_use',
        'point', 'start_date', 'end_date', 'status',
        'one_per_shop', 'fresh_use'
    ];


    protected $casts = [
        'shop_id' => 'integer',
        'no_use' => 'integer',
        'point' => 'float',
        'status' => 'integer',
        'one_per_shop' => 'integer',
        'fresh_use' => 'integer',
    ];





    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }


    public function pointCouponTrack()
    {
        return $this->hasMany('App\Models\PointCouponTrack');
    }
}
