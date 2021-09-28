<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class UserIdProof extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name', 'file_name', 'status', 'from_date', 'to_date'
    ];


    protected $casts = [
        'state_id' => 'integer',
        'status' => 'integer',
    ];

    public function getFileNameAttribute($file_name){
        if($this->userRole && $this->userRole->shop)
            return ($file_name) ? url("/assets/shop/{$this->userRole->shop->shop_key}/general/{$file_name}?rand={$this->updated_at->timestamp}") : '';
        else
            return null;
    }


    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function userRole()
    {
        return $this->belongsTo('App\Models\UserRole', 'user_id', 'user_id');
    }

}
