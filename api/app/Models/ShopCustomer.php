<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopCustomer extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'shop_id', 'name', 'email', 'phone',
         'status', 'web_push_token'
    ];

    protected $casts = [
        'status' => 'boolean',
        'shop_id' => 'integer'
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
