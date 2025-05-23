<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopProduct extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'name', 'description', 'url', 'status', 'sortorder',
        'shop_product_category_id', 'created_by', 'updated_by', 'deleted_by'
    ];

    protected $casts = [
        'status' => 'boolean',
        'shop_id' => 'integer',
        'sortorder' => 'integer',
        'shop_product_category_id' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
        'deleted_by' => 'integer'
    ];

    public static function boot() {
        parent::boot();

        static::deleting(function($shopProduct) { // before delete() method call this
            if ($shopProduct->isForceDeleting()) {
                $shopProduct->shopProductImage()->forceDelete();
                $shopProduct->shopProductVariant()->forceDelete();
            }else{
                $shopProduct->shopProductImage()->delete();
                $shopProduct->shopProductVariant()->delete();
            }
            return true;
             // do the rest of the cleanup...
        });

    }

    protected $appends = array('status_text');

    public function getStatusTextAttribute()
    {
        return (($this->status) ? 'Active' : 'In-Active');
    }



    public function user()
    {
        return $this->belongsTo('App\Models\User', 'created_by');
    }

    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function shopProductImage()
    {
        return $this->hasMany('App\Models\ShopProductImage');
    }

    public function shopProductVariant()
    {
        return $this->hasMany('App\Models\ShopProductVariant');
    }

    public function shopProductPrimaryVariant()
    {
        return $this->hasOne('App\Models\ShopProductVariant')->where("is_primary", 1);
    }

    public function shopProductCategory()
    {
        return $this->belongsTo('App\Models\ShopProductCategory');
    }

    public function shopProductTagMap()
    {
        return $this->hasMany('App\Models\ShopProductTagMap');
    }

    public function shopProductTag()
    {
        return $this->hasManyThrough(
            'App\Models\ShopProductTag',
            'App\Models\ShopProductTagMap',
            'shop_product_id', // Foreign key on users table...
            'id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'shop_product_tag_id' // Local key on users table...
        );
    }

    public function reportAbuse()
    {
        return $this->hasMany('App\Models\ReportAbuse');
    }

}
