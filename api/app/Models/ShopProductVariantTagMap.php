<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopProductVariantTagMap extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_product_variant_id', 'shop_product_variant_tag_id'
    ];


    protected $casts = [
        'shop_product_variant_id' => 'integer',
        'shop_product_variant_tag_id' => 'integer',
    ];

    public function shopProductVariant()
    {
        return $this->belongsTo('App\Models\ShopProductVariant');
    }

    public function shopProductVariantTag()
    {
        return $this->belongsTo('App\Models\ShopProductVariantTag');
    }
}
