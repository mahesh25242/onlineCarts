<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ReportAbuse extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'report_abuse_type_id', 'shop_id', 'url', 'name', 'ip', 'content', 'shop_product_id'
    ];


    protected $casts = [
        'report_abuse_type_id' => 'integer',
        'shop_id' => 'integer',
        'shop_product_id' => 'integer',
    ];



    public function reportAbuseType()
    {
        return $this->belongsTo('App\Models\ReportAbuseType');
    }

    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function shopProduct()
    {
        return $this->belongsTo('App\Models\ShopProduct');
    }

}
