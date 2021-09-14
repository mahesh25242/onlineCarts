<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class HelpTicket extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent', 'shop_id', 'subject', 'content', 'attachment', 'status', 'help_ticket_type_id'
    ];


    protected $casts = [
        'parent' => 'integer',
        'shop_id' => 'integer',
        'status' => 'integer',
        'help_ticket_type_id' => 'integer',
    ];

    protected $appends = array('status_text');


    public function getStatusTextAttribute()
    {
        $statusText = 'New';
        switch($this->status){
            case 0:
                $statusText = 'New';
            break;
            case 1:
                $statusText = 'Accepted';
            break;
            case 2:
                $statusText = 'Replied';
            break;
            case 3:
                $statusText = 'Solved';
            break;
        }
        return $statusText;
    }

    public function HelpTicketType()
    {
        return $this->belongsTo('App\Models\HelpTicketType');
    }

    public function shop()
    {
        return $this->belongsTo('App\Models\Shop');
    }

    public function replies()
    {
        return $this->hasMany('App\Models\HelpTicket', 'parent', 'id')->latest();
    }

    public function allChildrenReplies()
    {
        return $this->replies()->with('allChildrenReplies');
    }

}
