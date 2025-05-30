<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Image;
use Illuminate\Support\Facades\Hash;
use App\Mail\ShopRegisterNotification;
use Mail;
use Carbon\Carbon;
use App\Events\ShopStatusChangeEvent;
use App\Http\Resources\ShopResurce;

class ShopsController extends Controller
{



    public function shops(Request $request){
        $perpage = 50;
        $shops = \App\Models\Shop::with(["shopCurrentRenewal", "shopPoint"]);

        if($request->input("name", null)){

            $name = $request->input("name");
            $shops = $shops->where("name", 'like', "%{$name}%");
        }

        if($request->input("phone", null)){

            $phone = $request->input("phone");
            $shops = $shops->where("phone", 'like', "%{$phone}%");
        }

        if($request->input("status" ,null) !== null && $request->input("status" ,null) !== ""){
            $status = $request->input("status");
            $shops = $shops->where("status",  $status);
        }

        return response($shops->paginate($perpage));
    }

    public function trashShops(Request $request){
        $perpage = 50;
        $shops = \App\Models\Shop::onlyTrashed()->paginate($perpage);
        return response($shops);
    }


    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'status' => ['required'],
            'country_id' => 'required'
        ],[],[
            'country_id' => 'country',
        ]);




        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $input = $request->all();

        $country_id = ($request->input("country_id", null)) ? json_decode($request->input("country_id", null), true) : '' ;
        $state_id = ($request->input("state_id", null)) ? json_decode($request->input("state_id", null), true) : '' ;
        $city_id = ($request->input("city_id", null)) ? json_decode($request->input("city_id", null), true) : '' ;
        $shop_category_id = ($request->input("shop_category_id", null)) ? json_decode($request->input("shop_category_id", null), true) : '' ;

        $input["shop_category_id"] = $shop_category_id["id"] ?? 0;
        $input["country_id"] = $country_id["id"] ?? null;
        $input["state_id"] = $state_id["id"] ?? null;
        $input["city_id"] = $city_id["id"] ?? null;
        $input["shop_url"] = $request->input("shop_url", '');
        $input["shop_url"] = ($input["shop_url"]) ? trim($input["shop_url"]) : '';
        $input["shop_url"] = ($input["shop_url"]) ? rtrim($input["shop_url"], "/") : '';



        unset($input["logo"]);
        unset($input["favicon"]);


        if($request->input("id", 0)){
            $shop = \App\Models\Shop::where('id', $request->input("id", 0))->update($input);
            $shop =  \App\Models\Shop::find( $request->input("id", 0));
        }else{
            $input["shop_key"] = sha1(time());
            $shop = \App\Models\Shop::create($input);
        }

        if($request->input("isRegister", null)){
            $name = $request->input("displayName", '');
            $email = $request->input("email", '');
            $uid = $request->input("uid", '');

            $userExists = \App\Models\User::where("email", $email)->exists();
            if(!$userExists ){
                $user = new \App\Models\User;
                $user->fname = $name;
                $user->lname = "";
                $user->email = $email;
                $user->password = Hash::make($uid);
                $user->status = 1;
                $user->save();
            }else{
                $user = \App\Models\User::where("email", $email)->get()->first();
            }

            //copy data from default shop
            $defaultShop = \App\Models\Shop::where("is_default", 1)->get()->take(1)->first();
            $shop->favicon = $defaultShop->favicon;
            $shop->theme_color = $defaultShop->theme_color;
            $shop->bg_color = $defaultShop->bg_color;
            $shop->short_name = $shop->name;
            $shop->icons = $defaultShop->icons;
            $shop->logo = $defaultShop->logo;
            $shop->save();

            $package = \App\Models\Package::where("price", 0)->get()->first();
            if($package){
                $planMonths = $package->duration;
            }else{
                $plan = \App\Models\Setting::where("name", 'shop_expiry')->get()->first();
                $planMonths = ($plan) ? (int) $plan->value : 1;
            }

            $shop->shopRenewal()->create([
                "amount" => 0,
                "from_date" => Carbon::now()->startOfDay(),
                "to_date" => Carbon::now()->addMonths($planMonths)->endOfDay(),
                "status" => 1
            ]);
            $userRole = \App\Models\UserRole::updateOrCreate(
                [
                    "shop_id" => $shop->id,
                    "role_id" => 2,
                    "user_id" => $user->id
                ],
                [
                    "shop_id" => $shop->id,
                    "role_id" => 2,
                    "user_id" => $user->id
                ]
            );

            if($request->input("ref_by", null)){
                $refPointSet = \App\Models\Setting::where("name", 'ref_point')->get()->first();
                $refPoint = ($refPointSet) ? (int) $refPointSet->value : 0;
                if($refPoint){
                    //addpoint to referensed shop
                    $ref_by = $request->input("ref_by", null);
                    $refShop =   \App\Models\Shop::where('shop_key', $ref_by)->get()->first();
                    if($refShop->shopPoint){
                        $ShopPoint = $refShop->shopPoint;
                        $refShop->shopPoint->points += $refPoint;
                        $refShop->shopPoint->save();
                    }else{
                        $ShopPoint = new \App\Models\ShopPoint;
                        $ShopPoint->shop_id = $refShop->id;
                        $ShopPoint->points = $refPoint;
                        $ShopPoint->save();
                    }

                    $shopPointTran = new \App\Models\ShopPointTran;
                    $shopPointTran->shop_point_id = $ShopPoint->id;
                    $shopPointTran->point = $refPoint;
                    $shopPointTran->is_reference = 1;
                    $shopPointTran->save();
                    \App\Models\ShopMessage::create([
                        'shop_id' => $ShopPoint->shop_id,
                        'prefill_message_id' => 0,
                        'message' => sprintf("%d coins was added to your account for reference", $refPoint)
                    ]);

                    //addpoint to registered shop
                    $ShopPoint = new \App\Models\ShopPoint;
                    $ShopPoint->shop_id = $shop->id;
                    $ShopPoint->points = $refPoint;
                    $ShopPoint->save();

                    $shopPointTran = new \App\Models\ShopPointTran;
                    $shopPointTran->shop_point_id = $ShopPoint->id;
                    $shopPointTran->point = $refPoint;
                    $shopPointTran->is_reference = 1;
                    $shopPointTran->save();
                    \App\Models\ShopMessage::create([
                        'shop_id' => $ShopPoint->shop_id,
                        'prefill_message_id' => 0,
                        'message' => sprintf("%d coins was added to your account for reference", $refPoint)
                    ]);

                }

            }else{
                $regPoint = \App\Models\Setting::where("name", 'register_point')->get()->first();
                $refPoint = ($regPoint) ? (int) $regPoint->value : 0;
                if($refPoint){
                    $ShopPoint = new \App\Models\ShopPoint;
                    $ShopPoint->shop_id = $shop->id;
                    $ShopPoint->points = $refPoint;
                    $ShopPoint->save();

                    $shopPointTran = new \App\Models\ShopPointTran;
                    $shopPointTran->shop_point_id = $ShopPoint->id;
                    $shopPointTran->point = $refPoint;
                    $shopPointTran->is_reference = 0;
                    $shopPointTran->save();
                    \App\Models\ShopMessage::create([
                        'shop_id' => $ShopPoint->shop_id,
                        'prefill_message_id' => 0,
                        'message' => sprintf("%d coins was added to your account", $refPoint)
                    ]);
                }
            }

            $toEMail = $email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            if($toEMail){
                try{
                    Mail::to($toEMail)->send(new ShopRegisterNotification($user, $shop));
                }catch (\Swift_TransportException $e) {
                  //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }
            }


        }

        if ($request->hasFile('favicon')) {
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('favicon')->move($destinationPath, "favicon.ico");
            $shop->favicon = 'favicon.ico';
            $shop->save();
        }

        if ($request->hasFile('logo')) {
            $logoName = sprintf("%s.%s",time(), $request->file('logo')->extension());
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('logo')->move($destinationPath, $logoName);

            $png = Image::make($destinationPath.'/'.$logoName)->encode('png');
            $png->save($destinationPath.'/logo.png');


            $png = Image::make($destinationPath.'/logo.png')->resize(72, 72);
            $png->save($destinationPath.'/icon-72x72.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(96, 96);
            $png->save($destinationPath.'/icon-96x96.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(128, 128);
            $png->save($destinationPath.'/icon-128x128.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(144, 144);
            $png->save($destinationPath.'/icon-144x144.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(152, 152);
            $png->save($destinationPath.'/icon-152x152.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(192, 192);
            $png->save($destinationPath.'/icon-192x192.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(384, 384);
            $png->save($destinationPath.'/icon-384x384.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(512, 512);
            $png->save($destinationPath.'/icon-512x512.png');


            Storage::disk('public')->delete(str_replace("assets/", "", $destinationPath).'/'.$logoName);
            $shop->logo = 'logo.png';
            $shop->save();
        }


        return response(['data' => $shop, 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function setFaviconOrLogo(Request $request){

        $shop = $request->input('x_shop', null);

        if(!$shop){
            return response(['message' => 'No shop found!', 'status' => false], 404);
        }
        if ($request->hasFile('favicon')) {
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('favicon')->move($destinationPath, "favicon.ico");
            $shop->favicon = 'favicon.ico';
            $shop->save();
        }

        if ($request->hasFile('logo')) {
            $logoName = sprintf("%s.%s",time(), $request->file('logo')->extension());
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('logo')->move($destinationPath, $logoName);

            $png = Image::make($destinationPath.'/'.$logoName)->encode('png');
            $png->save($destinationPath.'/logo.png');


            $png = Image::make($destinationPath.'/logo.png')->resize(72, 72);
            $png->save($destinationPath.'/icon-72x72.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(96, 96);
            $png->save($destinationPath.'/icon-96x96.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(128, 128);
            $png->save($destinationPath.'/icon-128x128.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(144, 144);
            $png->save($destinationPath.'/icon-144x144.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(152, 152);
            $png->save($destinationPath.'/icon-152x152.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(192, 192);
            $png->save($destinationPath.'/icon-192x192.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(384, 384);
            $png->save($destinationPath.'/icon-384x384.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(512, 512);
            $png->save($destinationPath.'/icon-512x512.png');


            Storage::disk('public')->delete(str_replace("assets/", "", $destinationPath).'/'.$logoName);
            $shop->logo = 'logo.png';
            $shop->save();
        }
        return response(['message' => 'successfully chnaged!', 'status' => true]);
    }

    public function delete(Request $request, $id=0){
        if($request->input("force", null)){
            $shop =  \App\Models\Shop::where("id", $id)->withTrashed()->get()->first();
            if($shop->shop_key){
                $fromPath = 'assets/shop/'.$shop->shop_key;
                if(file_exists($fromPath)){
                    File::deleteDirectory($fromPath);
                }
            }
            $shop =  $shop->forceDelete();
        }else if($request->input("restore", null)){
            $shop =  \App\Models\Shop::where('id', $id)->restore();
        }else{
            $shop =  \App\Models\Shop::where('id', $id)->delete();
        }

       return response(['message' => 'successfully deleted!', 'status' => true]);
    }

    public function changeStatus(Request $request){
        $validator = Validator::make($request->all(), [
            'shop_id' => ['required'],
            'prefill_message_name' => ['required'],
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $shop = \App\Models\Shop::find($request->input("shop_id", 0));
        if(!$shop){
            return response(['message' => '404', 'status' => true], 404);
        }
        $shop->status = !$shop->status;
        $shop->save();

        event(new ShopStatusChangeEvent($shop, ["pmn" => $request->input("prefill_message_name", '')]));

        return response(['message' => 'successfully changed status!', 'status' => true]);
    }

    public function getAShop(Request $request, $id=0){
       $shop =  \App\Models\Shop::with(["country", "state",
       "city", "shopCategory", "userRole"=> function($q){
           $q->with(["user"])->where("role_id", 2);
       }])->where("shop_key", $id)->get()->first();
       return response($shop);
    }

    public function shopDetails(Request $request){
        $shop = $request->input('x_shop', null);

        if($shop){
            $shop = \App\Models\Shop::with(["country", "state", "city",
             "shopDelivery", "shopTheme.theme", "shopDeliverySlot",
              "shopCurrentRenewal"])->find($shop->id);
            if(!$shop->is_default && !$shop->shopCurrentRenewal && $shop->status){
                $shop->status = 0;
                $shop->save();

                event(new ShopStatusChangeEvent($shop, ["pmn" => 'shop payment pending']));



            }
            return response(new ShopResurce($shop));
        }else{
            return response(['message' => 'No data found!', 'status' => false]);
        }
    }



    public function byShopName($name=''){
        if($name){
            $shop =  \App\Models\Shop::where("base_path", "/{$name}/")->get()->first();

            if($shop){
                return response($shop);
            }else{
                return response(['message' => 'No data found!', 'status' => false], 422);
            }
        }else{
            return response(['message' => 'No data found!', 'status' => false], 422);
        }


    }

    public function webmanifest($shopKey=''){
        if($shopKey){
            $shop = \App\Models\Shop::with(["country", "state", "city", "shopDelivery", "shopTheme.theme"])
            ->where("shop_key", $shopKey)->get()->first();

            $json["name"] = $shop->name;
            $json["short_name"] = $shop->short_name;
            $json["theme_color"] = $shop->shopTheme->theme->theme_color;
            $json["background_color"] = $shop->shopTheme->theme->background_color;
            $json["display"] = "standalone";
            $json["scope"] = "./";
            $json["start_url"] = "./";
            $json["icons"] = array(
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-72x72.png"),
                    "sizes" => "72x72",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-96x96.png"),
                    "sizes" => "96x96",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-128x128.png"),
                    "sizes" => "128x128",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-144x144.png"),
                    "sizes" => "144x144",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-152x152.png"),
                    "sizes" => "152x152",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => "assets/icons/icon-192x192.png",
                    "sizes" => "192x192",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-384x384.png"),
                    "sizes" => "384x384",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                ),
                array(
                    "src" => url("assets/shop/{$shopKey}/general/icon-512x512.png"),
                    "sizes" => "512x512",
                    "type" => "image/png",
                    "purpose" => "maskable any",
                )
            );


            return response($json);
        }else{
            return response(['message' => 'No data found!', 'status' => false]);
        }
    }

    public function updateDetails(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone' => ['required'],
            "country_id" => ["required"]
        ],[],[
            "country_id" => "country name"
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $country_id = ($request->input("country_id", null)) ? json_decode($request->input("country_id", null), true) : '' ;
        $state_id = ($request->input("state_id", null)) ? json_decode($request->input("state_id", null), true) : '' ;
        $city_id = ($request->input("city_id", null)) ? json_decode($request->input("city_id", null), true) : '' ;



        $phone = $request->input("phone", '');
        $phone = ($country_id["phonecode"] ?? '91' ).$phone;
        $shopInput = [
            "name" => $request->input("name", ''),
            "short_name" => $request->input("short_name", ''),
            "phone" => $phone,
            "address" => $request->input("address", ''),
            "pin" => $request->input("pin", ''),
            "country_id" => $country_id["id"] ?? null,
            "state_id" => $state_id["id"] ?? null,
            "city_id" => $city_id["id"] ?? null,
            "map" => $request->input("map", ''),
            "business_hours" => $request->input("business_hours", ''),
        ];

        $shop = $request->input('x_shop', null);



        if($shop->phone != $phone){
            $shopInput["is_mobile_verified"] = 0;
        }
        $shop->update($shopInput);

       // \App\Models\Shop::where('id', $shop->id)->update($shopInput);

        if ($request->hasFile('logo')) {
            $logoName = sprintf("%s.%s",time(), $request->file('logo')->extension());
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('logo')->move($destinationPath, $logoName);

            $png = Image::make($destinationPath.'/'.$logoName)->encode('png');
            $png->save($destinationPath.'/logo.png');


            $png = Image::make($destinationPath.'/logo.png')->resize(72, 72);
            $png->save($destinationPath.'/icon-72x72.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(96, 96);
            $png->save($destinationPath.'/icon-96x96.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(128, 128);
            $png->save($destinationPath.'/icon-128x128.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(144, 144);
            $png->save($destinationPath.'/icon-144x144.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(152, 152);
            $png->save($destinationPath.'/icon-152x152.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(192, 192);
            $png->save($destinationPath.'/icon-192x192.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(384, 384);
            $png->save($destinationPath.'/icon-384x384.png');

            $png = Image::make($destinationPath.'/logo.png')->resize(512, 512);
            $png->save($destinationPath.'/icon-512x512.png');


            Storage::disk('public')->delete(str_replace("assets/", "", $destinationPath).'/'.$logoName);
            $shop->logo = 'logo.png';
            $shop->save();
        }

        if ($request->hasFile('favicon')) {
            $destinationPath = "assets/shop/{$shop->shop_key}/general";
            $request->file('favicon')->move($destinationPath, "favicon.ico");
            $shop->favicon = 'favicon.ico';
            $shop->save();
        }

        // $this->generateSite(
        //     $request->merge(
        //         [
        //             "shop_key"=> $shop->shop_key
        //         ]
        //     )
        // );

        return response(['message' => 'successfully saved',  'status' => true]);
    }

    public function adminHomeStat(Request $request){

        $shop = $request->input('x_shop', null);

        $stat = [
            "products" => \App\Models\ShopProduct::where("shop_id", $shop->id)->count(),
            "active_products" => \App\Models\ShopProduct::where("shop_id", $shop->id)->where("status", 1)->count(),
            "categories" => \App\Models\ShopProductCategory::where("shop_id", $shop->id)->count(),
            "active_categories" => \App\Models\ShopProductCategory::where("shop_id", $shop->id)->where("status", 1)->count(),
            "orders" => \App\Models\ShopOrder::where("shop_id", $shop->id)->count(),
            "cancelled" => \App\Models\ShopOrder::where("shop_id", $shop->id)->where("status", 5)->count(),
            "delivered" => \App\Models\ShopOrder::where("shop_id", $shop->id)->where("status", 4)->count(),
            "latest_orders" => \App\Models\ShopOrder::with(["shopCustomer", 'shopDelivery'])->where("shop_id", $shop->id)->orderBy("id", "DESC")->take(10)->get(),
            "delivery_locations" => \App\Models\ShopDelivery::where("shop_id", $shop->id)->count(),
        ];

        return response($stat);
    }

    public function generateSite(Request $request){
        return '';
        $files = Storage::allFiles("shopSite");
        $shopKey = $request->input("shop_key", '3d9f5a8eec71764c7c2df5a56496c8a1320dd921');
        $shop =  \App\Models\Shop::where("shop_key", $shopKey)->get()->first();

        $toBasePath = 'shop/'.$shopKey.'/www';

        $replacer["shopSite/index.html"] = [
            "CART_SITE_PATH" => $shop->base_path ??  '/',
            "CART_FAVICON_ICO" => $shop->favicon ?? 'favicon.ico',
            "CART_THEME_COLOR" => $shop->theme_color ?? '#1976d2',
            "CART_SHOP_KEY" => $shopKey,
            "CART_SHOP_NAME" => $shop->name,
        ];

        $replacer["shopSite/manifest.webmanifest"] = [
            "CART_BACKGROUND_COLOR" => $shop->bg_color ?? '#fafafa',
            "CART_SHOP_NAME" =>  $shop->name,
            "CART_SHOP_SHORT_NAME" =>  $shop->short_name ?? $shop->name,
            "CART_THEME_COLOR" => $shop->name ?? '#1976d2'
        ];
        $replacer["shopSite/ngsw.json"] = [
            "CART_SITE_PATH" => $shop->base_path ??  '/',
        ];

        $replacer["shopSite/.htaccess"] = [
            "CART_SITE_PATH" => $shop->base_path ??  '/',
        ];

        $customFiles = [
            "favicon.ico"=>"favicon",
            "logo.png"=>"logo",
            "icon-72x72.png"=>"icons",
            "icon-96x96.png"=>"icons",
            "icon-128x128.png"=>"icons",
            "icon-144x144.png"=>"icons",
            "icon-152x152.png"=>"icons",
            "icon-192x192.png"=>"icons",
            "icon-384x384.png"=>"icons",
            "icon-512x512.png"=>"icons",
        ];
        foreach($files as $file){
            $toFile = str_replace("shopSite/", "", $file);


            Storage::disk('public')->delete("{$toBasePath}/{$toFile}");
            if(isset($replacer[$file])){
                $html =  Storage::get($file);
                foreach($replacer[$file] as $key => $val){
                    $html = str_replace($key, $val, $html);
                }
                Storage::disk('public')->put("{$toBasePath}/{$toFile}", $html);
            }else{
                Storage::disk('public')->writeStream("{$toBasePath}/{$toFile}", Storage::readStream($file));
            }
         }

         foreach($customFiles as $key => $file){
            if(($shop->{$file})){
                $filePath = "shop/{$shopKey}/general/{$key}";
                if(Storage::disk('public')->exists($filePath)){
                    if(Storage::disk('public')->exists("{$toBasePath}/{$key}")){
                        Storage::disk('public')->delete("{$toBasePath}/{$key}");
                    }
                    Storage::disk('public')->writeStream("{$toBasePath}/{$key}", Storage::disk('public')->readStream($filePath));
                }
            }else{
                $filePath = "shop/{$shopKey}/general/{$key}";
                if(Storage::disk('public')->exists($filePath)){
                    if(Storage::disk('public')->exists("{$toBasePath}/assets/icons/{$key}")){
                        Storage::disk('public')->delete("{$toBasePath}/assets/icons/{$key}");
                    }
                    Storage::disk('public')->writeStream("{$toBasePath}/assets/icons/{$key}", Storage::disk('public')->readStream($filePath));
                }
            }
         }


         if(env('APP_ENV') != 'local'){
            $fromPath = 'assets/shop/'.$shop->shop_key.'/www';
            $toPath = dirname(base_path()).rtrim($shop->base_path, '/');

            File::copyDirectory( $fromPath, $toPath);
        }

         return response(['message' => 'successfully generated',  'status' => true]);
    }

    public function downloadSite(Request $request){
        $toBasePath = 'assets/shop/'.$request->input("shop_key", '3d9f5a8eec71764c7c2df5a56496c8a1320dd921').'/www';

        $zip_file = 'assets/shop/'.$request->input("shop_key", '3d9f5a8eec71764c7c2df5a56496c8a1320dd921').'www.zip';
        $zip = new \ZipArchive();
        $zip->open($zip_file, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);

        $path = public_path($toBasePath);
        $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path));
        foreach ($files as $name => $file)
        {
            // We're skipping all subfolders
            if (!$file->isDir()) {
                $filePath     = $file->getRealPath();

                // extracting filename with substr/strlen
                $relativePath = substr($filePath, strlen($path) + 1);

                $zip->addFile($filePath, $relativePath);
            }
        }
        $zip->close();
        return response()->download($zip_file)->deleteFileAfterSend(true);
    }

    public function register(Request $request){       
        $recaptcha = new \ReCaptcha\ReCaptcha(env("RECAPTCHA_SECRET"));
        $resp = $recaptcha->setExpectedAction("SignUp")
                        //->setExpectedHostname(env("APP_URL"))
                        ->verify($request->input('recaptcha'), $request->ip());
        if (!$resp->isSuccess()) {
           return response(['message' => 'captcha validation error', 'errors' =>  $resp->getErrorCodes(), 'status' => false], 422);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'country_id' => ['required'],
            'shop_category_id' => ['required'],
            'phone' => ['required'],
            'address' => ['required'],
            'state_id' => ['required'],
            'city_id' => ['required'],
            'pin' => ['required'],
            'local' => ['required'],
            'base_path' => ['required', 'alpha_dash'],
        ],[],[
            'country_id' => 'country',
            'shop_category_id' => 'category',
            'state_id' => 'state',
            'city_id' => 'city',
            'local' => 'local place',
            'base_path' => 'shop url',
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $eliminatedFolderList = ["api", "assets", "cgi-bin", "shop"];
        $base_path = $request->input("base_path", '');
        $base_path = sprintf("/%s/",$base_path);
        $slugCheck = \App\Models\Shop::where("base_path", $base_path)->exists();
        if($slugCheck || in_array($request->input("base_path", ''), $eliminatedFolderList)){
            return response(['message' => 'Validation errors', 'errors' =>  ["base_path" => 'The give shop url was already taken'], 'status' => false], 422);
        }


        $idToken = $request->input("idToken", null);
        $auth = app('firebase.auth');
        //$signInResult = $auth->getUser($uid);;
        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
        } catch (InvalidToken $e) {
            echo 'The token is invalid: '.$e->getMessage();
        } catch (\InvalidArgumentException $e) {
            echo 'The token could not be parsed: '.$idToken.'=='.$e->getMessage();
        }
        $uid = $verifiedIdToken->claims()->get('sub');
        $authUser = $auth->getUser($uid);

        if( $authUser){
            $shop_url = null;
            $origin = $request->header('origin');
            if($origin){
                $shop_url= "{$origin}$base_path";
            }
            $request->merge(
                [
                    "isRegister"=> true,
                    "email" =>  $authUser->email,
                    "uid" =>  $authUser->uid,
                    "displayName" =>  $authUser->displayName,
                    "status" => 1,
                    "base_path" => $base_path,
                    "shop_url" => $shop_url,
                    "city_id" => ($request->input("city_id" , null)) ? json_encode($request->input("city_id" , null)) : null,
                    "country_id" => ($request->input("country_id" , null)) ? json_encode($request->input("country_id" , null)) : null,
                    "shop_category_id" => ($request->input("shop_category_id" , null)) ? json_encode($request->input("shop_category_id" , null)) : null,
                    "state_id" => ($request->input("state_id" , null)) ? json_encode($request->input("state_id" , null)) : null,
                ]
            );
            return $this->store($request);
        }else{
            return response(['message' => 'Validation errors', 'errors' =>  ["name" => 'Sorry the logged user has some issue please contact onlinecartsin@gmail.com'], 'status' => false], 422);
        }




    }

    public function mobileVerified(Request $request){
        $idToken = $request->input("idToken", null);
        if($idToken){
            $auth = app('firebase.auth');
            //$signInResult = $auth->getUser($uid);;
            try {
                $verifiedIdToken = $auth->verifyIdToken($idToken);
            } catch (InvalidToken $e) {
                echo 'The token is invalid: '.$e->getMessage();
            } catch (\InvalidArgumentException $e) {
                echo 'The token could not be parsed: '.$idToken.'=='.$e->getMessage();
            }
            $uid = $verifiedIdToken->claims()->get('sub');


            if( $uid){
                $shopKey = $request->header('shopKey');
                $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

                if($shopKey){
                    $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
                }else{
                    $shopKey = $request->input("shop_key");
                    $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
                }
                $shop->is_mobile_verified = 1;
                $shop->save();
                return response(['message' => 'success',  'status' => true]);
            }
        }
        return response(['message' => 'Validation errors', 'errors' =>  ["name" => 'invalida id token'], 'status' => false], 422);
    }

    public function ourClients(){
        $shops = \App\Models\Shop::where("is_default", '!=', 1)
        ->where("is_mobile_verified",  1)
        ->take(20)->get();

        return response($shops);
    }

    public function getMyPayments(Request $request){
        $shop = $request->input('x_shop', null);

        $perPage = $request->input("pageSize", 50);
        if($shop){
            $shopRenewal = \App\Models\ShopRenewal::with(["package"])->where("shop_id", $shop->id)
            ->latest()->paginate($perPage);

            return response($shopRenewal);
        }else{
            return response(['message' => 'No data found!', 'status' => false]);
        }
    }

}
