<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopPoint extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'points'
    ];


    protected $casts = [
        'shop_id' => 'integer',
        'points' => 'integer',
    ];

    public function shopPointTran()
    {
        return $this->hasMany('App\Models\ShopPointTran');
    }


    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }
}
