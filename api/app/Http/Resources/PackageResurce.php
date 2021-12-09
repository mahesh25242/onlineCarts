<?php
namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;


class PackageResurce extends JsonResource
{
    //public $preserveKeys = true;
    public static $wrap = 'package';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }

        $price = $this->price;
        if($shop && $shop->shopPoint){
            $price = ($this->price - $shop->shopPoint->points);
        }

        $price = ($price >= 0) ? $price : 0;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $price,
            'duration' => $this->duration,
            'status' => $this->status,
            'status_text' => $this->status_text,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'duration_text' => $this->duration_text,
            $this->mergeWhen(
                Auth::check()
            , [
                'points' => ($shop && $shop->shopPoint) ? $shop->shopPoint->points : 0
            ]),
        ];
    }
}
