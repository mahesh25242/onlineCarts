<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopDelivery extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'shop_id', 'name', 'description', 'charge',
         'sortorder', 'need_cust_loc', 'min_amount',
         'map_url', 'address'
    ];

    protected $casts = [
        'shop_id' => 'integer',
        'charge' => 'double',
        'sortorder' => 'integer',
        'need_cust_loc' => 'boolean',
        'min_amount' => 'double',
    ];


    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function shopOrder()
    {
        return $this->hasMany('App\Models\ShopOrder');
    }

}
