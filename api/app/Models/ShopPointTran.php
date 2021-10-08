<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopPointTran extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_point_id', 'point'
    ];


    protected $casts = [
        'shop_point_id' => 'integer',
        'point' => 'integer',
    ];

    public function shopPoint()
    {
        return $this->hasMany('App\Models\ShopPoint');
    }

    public function pointCouponTrack()
    {
        return $this->hasOne('App\Models\PointCouponTrack');
    }
}
