<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;


class State extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'country_id'
    ];
    protected $casts = [
        'country_id' => 'integer'
    ];



    public function shop()
    {
        return $this->hasMany('App\Models\Shop');
    }

    public function user()
    {
        return $this->hasMany('App\Models\User');
    }

    public function city()
    {
        return $this->hasMany('App\Models\City');
    }

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }
}
