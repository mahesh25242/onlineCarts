<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ShopProductController extends Controller
{
    public function showProducts(Request $request){
        $request->request->add(['status' => 1]);
        return $this->products($request);
    }


    public function products(Request $request){
        $shop = $request->input('x_shop', null);
        $perPage = $request->input("pageSize", 20);

        $shopId = ($shop) ? $shop->id : 0;


        $products = \App\Models\ShopProduct::with([
            "shopProductCategory",
            "shopProductPrimaryVariant.shopProductImage",
            "shopProductPrimaryVariant.shopProductVariantTag",
            "shopProductVariant.shopProductImage",
            "shopProductVariant.shopProductVariantTag",
        ])->where("shop_id", $shopId);

        if($request->input("status", 0)){
            $products =  $products->where("shop_products.status", $request->input("status", 0));
        }

        if($request->input("shop_product_category_id", 0)){
            $products = $products->where("shop_product_category_id", $request->input("shop_product_category_id", 0));
        }
        
        $DBPrefix = env('DB_PREFIX', '');
        $orderBy = ["{$DBPrefix}shop_products.sortorder", "ASC"];
        if( $request->input("selectedItems", null)){
            if($request->input("selectedItems.categories", null)){
                $products = $products->whereIn("shop_product_category_id", $request->input("selectedItems.categories", []));
            }

            if($request->input("selectedItems.priceFrom", 0) || $request->input("selectedItems.priceTo", 0)){
                $products = $products->whereHas("shopProductVariant", function($q) use($request){
                    $q->whereBetween("price", [ $request->input("selectedItems.priceFrom", 0) , $request->input("selectedItems.priceTo", 0) ]);
                });
            }

            if($request->input("selectedItems.varients", null)){
                $products = $products->whereHas("shopProductVariant", function($q) use($request){
                    $q->whereIn("name", $request->input("selectedItems.varients", null));
                });
            }

            if($request->input("selectedItems.productTags", null)){
                $products = $products->whereHas("shopProductTag", function($q) use($request){
                    $q->whereIn("shop_product_tag_maps.id", $request->input("selectedItems.productTags", null));
                });
            }

            if($request->input("selectedItems.productVarientTags", null)){
                $products = $products->whereHas("shopProductVariant", function($q) use($request){
                    $q->whereHas("shopProductVariantTag", function($q) use($request){
                        $q->whereIn("shop_product_variant_tags.id", $request->input("selectedItems.productVarientTags", null));
                    });
                });
            }

            if($request->input("selectedItems.sort", null)){
                $sortName =  $request->input("selectedItems.sort.name", null) ?? 'name' ;

                switch($sortName){
                    case 'name':
                    case 'sortorder':
                        if($request->input("selectedItems.sort.name", null) == 'name'){
                            $sortField =  "ANY_VALUE({$DBPrefix}shop_products.name)";
                        }else{
                            $sortField = "ANY_VALUE({$DBPrefix}shop_products.sortorder)";
                        }

                        // $sortField = ( $request->input("selectedItems.sort.name", null) ?? "{$DBPrefix}cart_shop_products.name");
                        $orderBy = [ $sortField , ( $request->input("selectedItems.sort.type", null) ?? 'ASC') ];
                    break;
                    default:

                        $sortField = ( $request->input("selectedItems.sort.name", null) ?? "{$DBPrefix}cart_shop_products.name");
                        $sortField = ($sortField) ? "ANY_VALUE({$DBPrefix}shop_product_variants.{$sortField})" : "{$DBPrefix}cart_shop_products.name";
                        $orderBy = [ $sortField, ( $request->input("selectedItems.sort.type", null) ?? 'ASC') ];
                        $products =  $products->join('shop_product_variants', 'shop_product_variants.shop_product_id', '=', 'shop_products.id');
                    break;

                }

            }

        }
      
        if($request->input("cat_url", null)){
            $products = $products->whereHas("shopProductCategory", function($q) use($request){
                $q->where("url", $request->input("cat_url", null));
            });
        }

        if($request->input("q", null)){
            $q = $request->input("q", null);
             //$products = $products->where("name", 'like', "%{$q}%");
             $products = $products->where(function($query)  use($q){

                $query->where("shop_products.name", 'like', "%{$q}%")->orwhereHas("shopProductCategory", function($qry) use($q){
                    $qry->where("name", 'like', "%{$q}%");
                });
             });
        }

        $products = $products->select("shop_products.*");                
        return response($products->groupBy("shop_products.id")->orderByRaw($orderBy[0]." ".$orderBy[1])->paginate($perPage ));
    }

    public function showProductsFilters(Request $request){
        $shop = $request->input('x_shop', null);
        $shopId = ($shop) ? $shop->id : 0;

        $maxPrice = \App\Models\ShopProductVariant::whereHas("shopProduct", function($q) use($shopId){
            $q->where("shop_id", $shopId)->where("status", 1);
        })->max("price");


        $minPrice = \App\Models\ShopProductVariant::whereHas("shopProduct", function($q) use($shopId){
            $q->where("shop_id", $shopId)->where("status", 1);
        })->min("price");


        $shopProductTags = ($shop->shopCategory) ? $shop->shopCategory->shopProductTag : null;

        $shopProductVarientTags = \App\Models\ShopProductVariantTag::where("shop_category_id", 0)->get();

        if($shop->shopCategory && $shop->shopCategory->shopProductVariantTag){
            if($shopProductVarientTags)
                $shopProductVarientTags =  array_merge($shopProductVarientTags->toArray(), $shop->shopCategory->shopProductVariantTag->toArray()) ;
            else
                $shopProductVarientTags = $shop->shopCategory->shopProductVariantTag;
        }
        
        return response([
            "max_price" => $maxPrice,
            "min_price" => $minPrice,
            "shop_product_tags" => $shopProductTags,
            "shop_product_varient_tags" => $shopProductVarientTags,
        ]);
    }

    public function store(Request $request){

        $validationField = [
            'name' => ['required'],
            'status' => ['required'],
            'shop_product_category_id' => ['required', 'numeric'],
            'variants.*.name' => ['required', 'string'],
            'variants.*.price' => ['required', 'numeric'],
        ];



        $validator = Validator::make($request->all(), $validationField, [], [
            'variants.*.name' => 'variant name',
            'shop_product_category_id' => 'product category',
            'variants.*.price' => 'variant price',
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shop_product_category_id = 0;
        if( $request->input("shop_product_category_id", 0) && $request->input("shop_product_category_id", 0)!= 'null'){
            $shop_product_category_id = $request->input("shop_product_category_id", 0);
            if($shop_product_category_id){
//                $shop_product_category_id = json_decode($shop_product_category_id);
              $shop_product_category_id = $shop_product_category_id;
            }
        }
        $productIns = [
            "name" => $request->input("name", ''),
            "description" => $request->input("description", ''),
            "status" => $request->input("status", 1),
            "sortorder" => $request->input("sortorder", 1),
            "shop_product_category_id" => $shop_product_category_id,
            "url" => \Illuminate\Support\Str::slug($request->input("name", ''), '-')
        ];

        $shop = $request->input('x_shop', null);


        if($request->input("id", 0)){
            \App\Models\ShopProduct::where('id', $request->input("id", 0))->update($productIns);
            $shopProduct = \App\Models\ShopProduct::find($request->input("id", 0));
        }else{
            $productIns["shop_id"] = ($shop) ? $shop->id : 0;
            $shopProduct = \App\Models\ShopProduct::create($productIns);
        }


        $spt = [];

        if( $request->input("shop_product_tags", null) && $request->input("shop_product_tags", null)!= 'null'){
            $shop_product_tags = $request->input("shop_product_tags", null);
            if($shop_product_tags){

                $shop_product_tags = json_decode($shop_product_tags, true);

                foreach( $shop_product_tags as $tags){
                    $shopProductTagMap = \App\Models\ShopProductTagMap::updateOrCreate(
                        [
                            'shop_product_id' => $shopProduct->id,
                            'shop_product_tag_id' => $tags["id"]
                        ],
                        [
                            'shop_product_id' => $shopProduct->id,
                            'shop_product_tag_id' => $tags["id"]
                        ]
                    );
                }
                $spt[] = $shopProductTagMap->id;
            }
        }

        \App\Models\ShopProductTagMap::whereNotIn("id", $spt)
                ->where("shop_product_id",  $shopProduct->id)->delete();

        $variants = $request->input("variants", null);
        if($shopProduct && $variants && is_array($variants) && !empty($variants)){
            $insVariantId = [];
            foreach($variants as $ind=>$variant){
                $shop_product_varient_tags = (isset($variant["shop_product_varient_tags"]) ? $variant["shop_product_varient_tags"] : null);
                if($shop_product_varient_tags){
                    $shop_product_varient_tags = json_decode($shop_product_varient_tags, true);
                }


                $shopProductVariant = \App\Models\ShopProductVariant::updateOrCreate(
                    [
                     "shop_product_id" =>  $shopProduct->id,
                     "id" =>  $variant["id"],
                    ],
                    [
                    "shop_product_id" =>  $shopProduct->id,
                     "name" =>  $variant["name"],
                     "description" =>  $variant["description"],
                     "is_primary" =>  $variant["is_primary"],
                     "type" =>  $variant["type"],
                     "actual_price" =>  ($variant["price"] >= $variant["actual_price"]) ? 0 : $variant["actual_price"],
                     "price" =>  $variant["price"],
                     "sortorder" =>  $variant["sortorder"],
                     "status" =>  1,
                     "created_by" =>  Auth::id(),
                     "updated_by" =>  Auth::id(),
                    ]
                );
                $insVariantId[] = $shopProductVariant->id;

                $productImg = null;

                $spvt = [];
                if($shop_product_varient_tags && is_array($shop_product_varient_tags )){
                    foreach($shop_product_varient_tags  as $shop_product_varient_tag ){
                        $shopProductVariantTagMap = \App\Models\ShopProductVariantTagMap::updateOrCreate(
                            [
                                "shop_product_variant_id" => $shopProductVariant->id,
                                "shop_product_variant_tag_id" => $shop_product_varient_tag["id"],
                            ],
                            [
                                "shop_product_variant_id" => $shopProductVariant->id,
                                "shop_product_variant_tag_id" => $shop_product_varient_tag["id"],
                            ]
                        );
                        $spvt[] = $shopProductVariantTagMap->id;
                    }
                }


                \App\Models\ShopProductVariantTagMap::whereNotIn("id", $spvt)
                ->where("shop_product_variant_id",  $shopProductVariant->id)->delete();


                if ($request->hasFile("variants.{$ind}.image")) {
                    $uniqid = Str::random(9);
                    $productImg = sprintf("%s.%s",time().$uniqid, $request->file("variants.{$ind}.image")->extension());
                    $destinationPath = "assets/shop/".$shopProduct->shop->shop_key.'/products';
                    $request->file("variants.{$ind}.image")->move($destinationPath, $productImg);

                    // $img = Image::make($destinationPath.'/'.$productImg)->encode('webp');
                    // $img->save($destinationPath.pathinfo($productImg, PATHINFO_FILENAME).'.webp');

                    // $productImg = pathinfo($productImg, PATHINFO_FILENAME).'.webp';

                    // if(Storage::disk('public')->exists(str_replace("assets/", "", $destinationPath)."/{$productImg}")){
                    //     Storage::disk('public')->delete(str_replace("assets/", "", $destinationPath)."/{$productImg}");
                    // }

                    if(!Storage::disk('public')->exists("shop/index.html")){
                        Storage::disk('public')->put("shop/index.html", 'unauthorised access');
                    }

                    if(!Storage::disk('public')->exists("shop/{$shopProduct->shop->shop_key}/index.html")){
                        Storage::disk('public')->put("shop/{$shopProduct->shop->shop_key}/index.html", 'unauthorised access');
                    }

                    if(!Storage::disk('public')->exists("shop/{$shopProduct->shop->shop_key}/category/index.html")){
                        Storage::disk('public')->put("shop/{$shopProduct->shop->shop_key}/category/index.html", 'unauthorised access');
                    }

                    if(!Storage::disk('public')->exists("shop/{$shopProduct->shop->shop_key}/products/index.html")){
                        Storage::disk('public')->put("shop/{$shopProduct->shop->shop_key}/products/index.html", 'unauthorised access');
                    }

                    // $img = Image::make($destinationPath.'/'.$productImg)->resize(350, null, function ($constraint) {
                    //     $constraint->aspectRatio();
                    // });


                    // $img->text($shopProduct->shop->name, 20, 20, function($font) {
                    //     $font->size(24);
                    //     $font->color(array(255, 255, 255, 0.5));

                    // });


                    // $img->save($destinationPath.'/'.$productImg, 60);



                    // if($shopProduct->shop->shop_url){
                    //     try{
                    //         $client = new \GuzzleHttp\Client(['headers' =>
                    //         [
                    //             'shopKey' => $shopProduct->shop->shop_key,
                    //             'type' => 'product'
                    //         ]
                    //         ]);
                    //         $res = $client->post("{$shopProduct->shop->shop_url}/copy-file.php", [
                    //             "form_params" => [
                    //                 "file"=>$productImg,
                    //                 "action" => "copy"
                    //             ]
                    //         ]);
                    //         $statusCode = $res->getStatusCode(); // 200
                    //         if($statusCode == 200){
                    //             $copyresponse = $res->getBody();
                    //             $copyresponse = json_decode($copyresponse, true);
                    //             if(isset($copyresponse["success"]) && $copyresponse["success"]){
                    //                 Storage::disk('public')->delete("shop/{$shopProduct->shop->shop_key}/products/{$productImg}");
                    //             }
                    //         }

                    //     }catch(Exception $e) {

                    //     }



                    // }

                }

                if($productImg){
                    $shopProductImage = \App\Models\ShopProductImage::where("shop_product_id", $shopProduct->id)
                    ->where("shop_product_variant_id", $shopProductVariant->id)->get()->first();
                    if($shopProductImage){
                        if(Storage::disk('public')->exists("shop/{$shopProduct->shop->shop_key}/products/{$shopProductImage->image}")){
                            Storage::disk('public')->delete("shop/{$shopProduct->shop->shop_key}/products/{$shopProductImage->image}");
                            // if($shopProduct->shop->shop_url){
                            //     try{
                            //         $client = new \GuzzleHttp\Client(['headers' =>
                            //         [
                            //             'shopKey' => $shopProduct->shop->shop_key,
                            //             'type' => 'product'
                            //         ]
                            //         ]);
                            //         $res = $client->post("{$shopProduct->shop->shop_url}/copy-file.php", [
                            //             "form_params" => [
                            //                 "file"=> $shopProductImage->image,
                            //                 "action" => "delete"
                            //             ]
                            //         ]);
                            //         $statusCode = $res->getStatusCode(); // 200
                            //         if($statusCode == 200){
                            //             $copyresponse = $res->getBody();
                            //             $copyresponse = json_decode($copyresponse, true);
                            //             if(isset($copyresponse["success"]) && $copyresponse["success"]){
                            //                 Storage::disk('public')->delete("shop/{$shopProduct->shop->shop_key}/products/{$productImg}");
                            //             }
                            //         }

                            //     }catch(Exception $e) {

                            //     }



                            // }
                        }
                    }


                    \App\Models\ShopProductImage::updateOrCreate(
                        [
                         "shop_product_id" =>  $shopProduct->id,
                         "shop_product_variant_id" =>  $shopProductVariant->id
                        ],
                        [
                            "shop_product_id" =>  $shopProduct->id,
                            "shop_product_variant_id" =>  $shopProductVariant->id,
                            "image" =>  $productImg,
                            "sortorder" =>  1,
                            "created_by" =>  Auth::id(),
                            "updated_by" =>  Auth::id()
                        ]
                    );
                }

            }

            \App\Models\ShopProductVariant::whereNotIn("id", $insVariantId)->where("shop_product_id",  $shopProduct->id)->delete();

            if(!\App\Models\ShopProductVariant::where("shop_product_id",  $shopProduct->id)->where("is_primary", 1)->exists()){
                $shopProductVariant = \App\Models\ShopProductVariant::where("shop_product_id",  $shopProduct->id)->get()->first();
                $shopProductVariant->is_primary = 1;
                $shopProductVariant->save();
            }
        }

        return response(['data' => $shopProduct, 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function delete(Request $request){
        $shop = $request->input('x_shop', null);
        $shopId = ($shop) ? $shop->id : 0;

        $shpProduct =  \App\Models\ShopProduct::where('id', $request->input("id"))
        ->where('shop_id', $shopId)->delete();
        return response(['message' => 'successfully deleted!', 'status' => true]);
    }

    public function changeStatus(Request $request){
        $shop = $request->input('x_shop', null);
        $shopId = ($shop) ? $shop->id : 0;

        $shopProduct =  \App\Models\ShopProduct::where('id', $request->input("id"))
        ->where("shop_id", $shopId)->get()->first();
        $shopProduct->status = !$shopProduct->status;
        $shopProduct->save();
        return response(['message' => 'successfully changed status!', 'status' => true]);
    }

    public function showProductDetails(Request $request){
        $shop = $request->input('x_shop', null);

        $condition = [
            'url' => $request->input("url"),
        ];

        if($shop){
            $condition['shop_id'] = $shop->id;
        }
        $shpProduct =  \App\Models\ShopProduct::with([
            "shopProductCategory",
            "shopProductPrimaryVariant.shopProductImage",
            "shopProductPrimaryVariant.shopProductVariantTag",
            "shopProductVariant.shopProductImage",
            "shopProductVariant.shopProductVariantTag",
            "shopProductTag"])->where("status", 1)
        ->where($condition)->get()->first();
        return response($shpProduct);
    }

    public function showProduct(Request $request, $id=0){

        $shpProduct =  \App\Models\ShopProduct::with(["shopProductCategory",
        "shopProductPrimaryVariant.shopProductImage",
        "shopProductPrimaryVariant.shopProductVariantTag",
        "shopProductVariant.shopProductImage",
        "shopProductVariant.shopProductVariantTag",
        "shopProductTag"])
        ->find($id);
        return response($shpProduct);
    }

}
