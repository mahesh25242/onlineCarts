<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class PrefillMessage extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'name', 'subject', 'message', 'is_default'
    ];


    protected $casts = [
        'shop_id' => 'integer',
        'is_default' => 'integer'
    ];

    
    protected $appends = array('default_text');

    public function getDefaultTextAttribute()
    {
        return (($this->is_default) ? 'Yes' : 'No');
    }
    

    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function shopMessage()
    {
        return $this->hasMany('App\Models\ShopMessage');
    }
    public function whatsupAddPhone()
    {
        return $this->hasMany('App\Models\WhatsupAddPhone');
    }
}
