<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopProductTag extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'shop_category_id', 'status'
    ];


    protected $casts = [
        'shop_category_id' => 'integer',
        'status' => 'integer'
    ];


    public function shopCategory()
    {
        return $this->belongsTo('App\Models\ShopCategory');
    }

    public function shopProductTagMap()
    {
        return $this->hasMany('App\Models\ShopProductTagMap');
    }

}
