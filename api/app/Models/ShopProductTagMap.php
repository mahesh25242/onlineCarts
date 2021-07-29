<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopProductTagMap extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_product_id', 'shop_product_tag_id'
    ];


    protected $casts = [
        'shop_product_id' => 'integer',
        'shop_product_tag_id' => 'integer',
    ];

    public function shopProductTag()
    {
        return $this->belongsTo('App\Models\ShopProductTag');
    }

    public function shopProduct()
    {
        return $this->belongsTo('App\Models\ShopProduct');
    }
}
