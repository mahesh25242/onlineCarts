<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class Package extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'price', 'duration', 'status', 'plan_id'
    ];


    protected $casts = [
        'price' => 'integer',
        'duration' => 'integer',
        'status' => 'integer',
    ];

    protected $appends = array('status_text', 'duration_text');

    public function getStatusTextAttribute()
    {
        return (($this->status) ? 'On' : 'Off');
    }
    
    public function getDurationTextAttribute()
    {
        return (($this->duration > 1) ? 'Months' : 'Month');
    }

    public function shopRenewal()
    {
        return $this->hasMany('App\Models\ShopRenewal');
    }
}
