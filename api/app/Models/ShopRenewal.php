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

    private $shoMessageDays = 10; //days to show renew alet message and also show renew related message and buttons and data

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'amount', 'from_date', 'to_date', 'status','package_id', 'attachement', 'comments', 'coins_used', 'order_id'
    ];
    protected $casts = [
        'shop_id' => 'integer',
        'amount' => 'double',
        'status' => 'boolean',
        'package_id' =>'integer',
        'coins_used' => 'double'
    ];
    protected $appends = array('remaining_days', 'show_message', 'show_message_days');



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

        return $date->diffInDays($now) < $this->shoMessageDays ;
    }

    public function getShowMessageDaysAttribute()
    {
        return $this->shoMessageDays;
    }


    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function package()
    {
        return $this->belongsTo('App\Models\Package');
    }


}
