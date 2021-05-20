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

class ShopsController extends Controller
{



    public function shops(Request $request){
        $shops = \App\Models\Shop::get();
        return response($shops);
    }

    public function trashShops(Request $request){
        $shops = \App\Models\Shop::onlyTrashed()->get();
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

        $input["shop_category_id"] = $request->input("shop_category_id.id", 0);
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

            $plan = \App\Models\Setting::where("name", 'shop_expiry')->get()->first();
            $planDays = ($plan) ? (int) $plan->value : 90;
            $shop->shopRenewal()->create([
                "amount" => 0,
                "from_date" => Carbon::now()->startOfDay(),
                "to_date" => Carbon::now()->addDays($planDays)->endOfDay(),
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

            //generate the registered site
            $this->generateSite(
                $request->merge(
                    [
                        "shop_key"=> $shop->shop_key
                    ]
                )
            );

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

    public function delete(Request $request, $id=0){
        if($request->input("force", null)){
            $shop =  \App\Models\Shop::where("id", $id)->withTrashed()->get()->first();
            if($shop->shop_key){
                $fromPath = 'assets/shop/'.$shop->shop_key;
                if(file_exists($fromPath)){
                    File::deleteDirectory($fromPath);
                }
            }
            if(env('APP_ENV') != 'local'){
                if($shop->shop_key){
                    $toPath = dirname(base_path()).rtrim($shop->base_path, '/');
                    if(rtrim($shop->base_path, '/') && file_exists($toPath ))
                        File::deleteDirectory($toPath);
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

    public function getAShop(Request $request, $id=0){
       $shop =  \App\Models\Shop::with(["country", "state",
       "city", "shopCategory", "userRole"=> function($q){
           $q->with(["user"])->where("role_id", 2);
       }])->where("shop_key", $id)->get()->first();
       return response($shop);
    }

    public function shopDetails(Request $request){
        $shopKey = $request->header('shopKey');

        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key");

        if($shopKey){
            $shop = \App\Models\Shop::with(["country", "state", "city", "shopDelivery", "shopTheme.theme"])->where("shop_key", $shopKey)->get()->first();
            return response($shop);
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
        $phone = $request->input("phone", '');
        $phone = $request->input("country_id.phonecode", '91').$phone;
        $shopInput = [
            "name" => $request->input("name", ''),
            "short_name" => $request->input("short_name", ''),
            "phone" => $phone,
            "address" => $request->input("address", ''),
            "pin" => $request->input("pin", ''),
            "country_id" => $request->input("country_id.id", 0),
            "state_id" => $request->input("state_id.id", 0),
            "city_id" => $request->input("city_id.id", 0),
            "map" => $request->input("map", ''),
        ];
        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }

        \App\Models\Shop::where('id', $shop->id)->update($shopInput);
        return response(['message' => 'successfully saved',  'status' => true]);
    }

    public function adminHomeStat(Request $request){

        $shopKey = $request->header('shopKey');
        $shopKey = ($shopKey) ? $shopKey : $request->input("shop_key",'');

        $shop = null;
        if($shopKey){
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }else{
            $shopKey = $request->input("shop_key");
            $shop = \App\Models\Shop::where("shop_key", $shopKey)->get()->first();
        }
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
           return response(['message' => 'Validation errors', 'errors' =>  $resp->getErrorCodes(), 'status' => false], 422);
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
            $request->merge(
                [
                    "isRegister"=> true,
                    "email" =>  $authUser->email,
                    "uid" =>  $authUser->uid,
                    "displayName" =>  $authUser->displayName,
                    "status" => 1,
                    "base_path" => $base_path,
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
}
