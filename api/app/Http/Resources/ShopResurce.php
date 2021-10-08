<?php
namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;


class ShopResurce extends JsonResource
{
    //public $preserveKeys = true;
    public static $wrap = 'shop';

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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'country_id' => $this->country_id,
            'state_id' => $this->state_id,
            'city_id' => $this->city_id,
            'pin' => $this->pin,
            'local' => $this->local,
            'map' => $this->map,
            'shop_key' => $this->shop_key,
            'shop_url' => $this->shop_url,
            'status' => $this->status,
            'shop_category_id' => $this->shop_category_id,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'deleted_by' => $this->deleted_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'base_path' => $this->base_path,
            'favicon' => $this->favicon,
            'theme_color' => $this->theme_color,
            'bg_color' => $this->bg_color,
            'short_name' => $this->short_name,
            'icons' => $this->icons,
            'logo' => $this->logo,
            'is_default' => $this->is_default,
            'is_mobile_verified' => $this->is_mobile_verified,
            'business_hours' => $this->business_hours,
            'country' => $this->whenLoaded('country'),
            'state' => $this->whenLoaded('state'),
            'city' => $this->whenLoaded('city'),
            'shop_delivery' => $this->whenLoaded('shopDelivery'),
            'shop_theme' => $this->whenLoaded('shopTheme'),
            'shop_delivery_slot' => $this->whenLoaded('shopDeliverySlot'),
            'shop_current_renewal' => $this->whenLoaded('shopCurrentRenewal'),
            $this->mergeWhen(
                Auth::check()
            , [
                'shop_point' => $this->ShopPoint
            ]),
        ];
    }
}
