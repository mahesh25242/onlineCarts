<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
//use Cache;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'mname', 'lname','email',  'password', 'phone', 'avatar',
         'status', 'created_by', 'updated_by', 'deleted_by',
    ];
    protected $appends = array('created_at_human');
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];


    public function getEmailAttribute($email)
    {
        return (Auth::id()) ? $email : (($email) ? '*': null);
    }

    public function getPhoneAttribute($phone)
    {
        return (Auth::id()) ? $phone : (($phone) ? '*': null);
    }


    public function getAvatarAttribute($avatar)
    {
        return (($avatar) ? url().'/assets/avatar/'.$avatar : 'assets/tumb.png');
    }



    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }


    public function findForPassport($username)
    {
        $customUsername = 'phone';
        $userNameExists = $this->where($customUsername, $username)->where("status", 1)->first();
        if($userNameExists){
            return $userNameExists;
        }else{
            $userNameExists = $this->where("email", $username)->where("status", 1)->first();
            return $userNameExists;
        }
    }
    // Owerride password here
    public function validateForPassportPasswordGrant($password)
    {
        $owerridedPassword = 'password';
        return Hash::check($password, $this->password);
    }


    public function userRole()
    {
        return $this->hasMany('App\Models\UserRole');
    }

    public function UserAddress()
    {
        return $this->hasMany('App\Models\UserAddress');
    }

    public function isSuperAdmin()
    {
        return $this->hasMany('App\Models\UserRole')->where("role_id",1);
    }

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }

    public function state()
    {
        return $this->belongsTo('App\Models\State');
    }

    public function city()
    {
        return $this->belongsTo('App\Models\City');
    }

    public function role()
    {
        return $this->hasManyThrough(
            'App\Models\Role',
            'App\Models\UserRole',
            'user_id', // Foreign key on users table...
            'id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'role_id' // Local key on users table...
        );
    }

    public function userLogin()
    {
        return $this->hasMany('App\Models\UserLogin');
    }

    public function lastLogin()
    {
        return $this->hasOne('App\Models\UserLogin', 'user_id')->where("name", "SignIn")->orderBy("id", "DESC")->skip(1)->take(1);
    }



    public function shopProduct()
    {
        return $this->hasMany('App\Models\ShopProduct', 'created_by');
    }

    public function shopProductImage()
    {
        return $this->hasMany('App\Models\ShopProductImage', 'created_by');
    }

    public function shopProductVariant()
    {
        return $this->hasMany('App\Models\ShopProductVariant', 'created_by');
    }


}
