<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class ShopMessage extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'shop_id', 'prefill_message_id', 'message'
    ];


    protected $casts = [
        'shop_id' => 'integer',
        'prefill_message_id' => 'integer'
    ];



    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function prefillMessage()
    {
        return $this->belongsTo('App\Models\PrefillMessage');
    }
}
