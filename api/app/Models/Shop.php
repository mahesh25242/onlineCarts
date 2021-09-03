<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Shop extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone', 'address', 'country_id',
        'state_id', 'city_id', 'pin', 'local', 'map',
        'shop_key', 'shop_url', 'status', 'shop_category_id',
        'created_by', 'updated_by', 'deleted_by', 'base_path', 'favicon',
        'theme_color', 'bg_color', 'short_name', 'icons', 'logo', 'is_default',
        'is_mobile_verified', "business_hours"
    ];

    protected $casts = [
        'status' => 'boolean',
        'is_default' => 'boolean',
        'country_id' => 'integer',
        'state_id' => 'integer',
        'city_id' => 'integer',
        'shop_category_id' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
        'deleted_by' => 'integer',
        'is_mobile_verified' => 'integer',
    ];

    protected $appends = array('status_text','is_generated',"max_banner");

    public static function boot() {
        parent::boot();


        static::created(function($shop) { // before delete() method call this
            $ShopTheme = new \App\Models\ShopTheme;
            $theme = \App\Models\Theme::where("is_default", 1)->get()->first();
            $ShopTheme->shop_id = $shop->id;
            $ShopTheme->theme_id = $theme->id;
            $ShopTheme->save();

            return true;
        });



        static::deleting(function($shop) {
            // Delete registry_detail
            if ($shop->isForceDeleting()) {
                $shop->ShopTheme()->forceDelete();
                $shop->shopProduct->each(function($shopProduct) {
                    $shopProduct->shopProductImage()->forceDelete();
                    $shopProduct->shopProductVariant()->forceDelete();
                });
                $shop->shopProduct()->forceDelete();
                $shop->shopProductCategory()->forceDelete();

                //$shop->userRole()->user()->forceDelete();

                $shop->userRole()->forceDelete();
                $shop->shopDelivery()->forceDelete();
                $shop->shopOrder()->forceDelete();
                $shop->shopRenewal()->forceDelete();
                return true;
            }
        });

    }
    public function getLogoAttribute($logo){
        return ($logo) ? url("/assets/shop/{$this->shop_key}/general/{$logo}?rand={$this->updated_at->timestamp}") : '';
    }

    public function getFaviconAttribute($favicon){
        return ($favicon) ?  url("/assets/shop/{$this->shop_key}/general/{$favicon}?rand={$this->updated_at->timestamp}"): '';
    }

    public function getStatusTextAttribute()
    {
        return (($this->status) ? 'Active' : 'In-Active');
    }

    public function getIsGeneratedAttribute()
    {
        return Storage::disk('public')->exists("shop/{$this->shop_key}/www");
    }

    public function getMaxBannerAttribute()
    {
        return 2;
    }


    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }

    public function state()
    {
        return $this->belongsTo('App\Models\State');
    }

    public function city()
    {
        return $this->belongsTo('App\Models\City');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'created_by');
    }



    public function shopProduct()
    {
        return $this->hasMany('App\Models\ShopProduct');
    }

    public function shopProductCategory()
    {
        return $this->hasMany('App\Models\ShopProductCategory');
    }

    public function userRole()
    {
        return $this->hasOne('App\Models\UserRole');
    }

    public function shopCategory()
    {
        return $this->belongsTo('App\Models\ShopCategory');
    }

    public function shopDelivery()
    {
        return $this->hasMany('App\Models\ShopDelivery');
    }

    public function shopCustomer()
    {
        return $this->hasMany('App\Models\ShopCustomer');
    }

    public function shopOrder()
    {
        return $this->hasMany('App\Models\ShopOrder');
    }

    public function shopRenewal()
    {
        return $this->hasMany('App\Models\ShopRenewal');
    }

    public function shopTheme()
    {
        return $this->hasOne('App\Models\ShopTheme');
    }

    public function shopDeliverySlot()
    {
        return $this->hasMany('App\Models\ShopDeliverySlot');
    }

    public function cms()
    {
        return $this->hasMany('App\Models\Cms');
    }

    public function helpTicket()
    {
        return $this->hasMany('App\Models\HelpTicket');
    }

}
