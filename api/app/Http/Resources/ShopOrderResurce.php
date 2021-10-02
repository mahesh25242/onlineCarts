<?php
namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ShopCustomerResurce;

class ShopOrderResurce extends JsonResource
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
            'shop_customer_id' => $this->shop_customer_id,
            'total' => $this->total,
            'delivery_chage' => $this->delivery_chage,
            'address' => $this->address,
            'pin' => $this->pin,
            'note' => $this->note,
            'loc' => $this->loc,
            'status' => $this->status,
            'shop_delivery_id' => $this->shop_delivery_id,
            'delivery_at' => $this->delivery_at,
            'web_push_token' => $this->web_push_token,
            'sec_key' => $this->sec_key,
            'delivery_slot' => $this->delivery_slot,
            'status_text' => $this->status_text,
            'shop' => $this->shop,
            'shop_customer' => new ShopCustomerResurce($this->shopCustomer),
            'shop_delivery' => $this->shopDelivery,
            'shop_order_item' => $this->shopOrderItem,
        ];
    }
}
