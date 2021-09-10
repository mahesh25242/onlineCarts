<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Carbon\Carbon;

class ShopRenewal extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'amount', 'from_date', 'to_date', 'status'
    ];
    protected $casts = [
        'shop_id' => 'integer',
        'amount' => 'double',
        'status' => 'boolean',
    ];
    protected $appends = array('remaining_days', 'show_message');



    public function getRemainingDaysAttribute()
    {
        $date = Carbon::parse($this->to_date);
        $now = Carbon::now();

        return $date->diffInDays($now);
    }
    public function getShowMessageAttribute()
    {
        $date = Carbon::parse($this->to_date);
        $now = Carbon::now();

        return $date->diffInDays($now) < 10;
    }


    public function shop()
    {
        return $this->hasMany('App\Models\Shop');
    }


}
