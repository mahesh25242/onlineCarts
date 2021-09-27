<?php
namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ShopCustomerResurce extends JsonResource
{
    //public $preserveKeys = true;
    public static $wrap = 'shopOrder';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'shop_id' => $this->shop_id,
            'name' => $this->name,


            $this->mergeWhen(
                Auth::check()
            , [
                'phone' => $this->phone,
                'email' => $this->email,
            ]),
            $this->mergeWhen(
                !Auth::check()
            , [
                'phone' => str_repeat('*', (strlen($this->phone) - 3)).substr($this->phone,-3),
                'email' => ($this->email) ? str_repeat('*', (strlen($this->email) - 3)).substr($this->email,-3) : null,
            ]),

            'status' => $this->status,
            'web_push_token' => $this->web_push_token,

            'shop' => $this->shop,
            'shop_order' => $this->shopOrder
        ];
    }
}
