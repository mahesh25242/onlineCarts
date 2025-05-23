<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopOrderItem extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'shop_order_id', 'shop_product_variant_id', 'qty', 'price',
         'status', 'message'
    ];

    protected $casts = [
        'status' => 'boolean',
        'shop_order_id' => 'integer',
        'qty' => 'integer',
        'price' => 'double'
    ];

    public function shopOrder()
    {
        return $this->belongsTo('App\Models\ShopOrder');
    }

    public function shopProductVariant()
    {
        return $this->belongsTo('App\Models\ShopProductVariant');
    }

}
