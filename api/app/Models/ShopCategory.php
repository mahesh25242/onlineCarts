<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopCategory extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'name', 'description', 'status', 'sortorder',
        'created_by', 'updated_by', 'deleted_by', 'image'
    ];

    protected $casts = [
        'status' => 'boolean',
        'sortorder' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
        'deleted_by' => 'integer'
    ];

    protected $appends = array('status_text');

    public function getImageAttribute($image)
    {
        if($image){
            return url("assets/categories/{$image}");
        }else{
            return null;
        }
    }

    public function getStatusTextAttribute()
    {
        return (($this->status) ? 'Yes' : 'No');
    }


    public function user()
    {
        return $this->belongsTo('App\Models\User', 'created_by');
    }

    public function shop()
    {
        return $this->hasMany('App\Models\Shop');
    }

    public function shopProductTag()
    {
        return $this->hasMany('App\Models\ShopProductTag');
    }

    public function shopProductVariantTag()
    {
        return $this->hasMany('App\Models\ShopProductVariantTag');
    }


}
