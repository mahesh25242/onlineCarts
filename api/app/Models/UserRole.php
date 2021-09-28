<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class UserRole extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id', 'user_id', 'role_id', 'created_by', 'updated_by', 'deleted_by'
    ];


    protected $casts = [
        'shop_id' => 'integer',
        'user_id' => 'integer',
        'role_id' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
        'deleted_by' => 'integer',
    ];




    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function role()
    {
        return $this->belongsTo('App\Models\Role');
    }

    public function UserIdProof()
    {
        return $this->hasMany('App\Models\UserIdProof', 'user_id', 'user_id');
    }

    public function latestuserIdProof()
    {
        return $this->hasOne('App\Models\UserIdProof', 'user_id', 'user_id')->latest();
    }

}
