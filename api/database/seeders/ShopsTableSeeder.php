<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ShopsTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
    public function run()
    {
        $demoCartKey = '3d9f5a8eec71764c7c2df5a56496c8a1320dd921';
        if(DB::table('shops')->where('shop_key', $demoCartKey)->doesntExist()){

            $input = [
                'name' => 'Demo Shop',
                'email' => 'demo@cart.com',
                'phone' => '917907509512',
                'address' => 'Kochi',
                'country_id' => '101',
                'state_id' => '19',
                'city_id' => '1930',
                'pin' => '686635',
                'shop_key' => '3d9f5a8eec71764c7c2df5a56496c8a1320dd921',
                'shop_url' => '',
                'status' => 1,
                'shop_category_id' => 1,
                'base_path' => '/test/',
                'favicon' => 'favicon.ico',
                'short_name' => 'Demo Shop',
                'is_default' => 1,
                'is_mobile_verified' => 1
            ];


            $shopId = DB::table('shops')->insertGetId($input);




            $input = [
                'fname' => 'Demo Admin',
                'email' => 'demo@cart.com',
                'phone' => '1234567890',
                'password' => Hash::make('123456'),
                'phone' => '1234567890'
            ];

            $userId = DB::table('users')->insertGetId($input);

            $userRoles = [
                        "shop_id" => $shopId,
                        "role_id" => 2,
                        "user_id" => $userId
            ];

            DB::table('user_roles')->insert($userRoles);


            $cms = [
                [
                    "name" => "About Us",
                    "url" => "about_us",
                    "content" => "<p>Its a demo shop. The product is listed under this site is for demo purpose.</p>",
                    "shop_id" => $shopId,
                    "status" => 1,
                ],
                [
                    "name" => "Terms",
                    "url" => "terms",
                    "content" => "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate tellus non sem lacinia, sed finibus velit pellentesque. Morbi dignissim mi sed tellus aliquam, vitae lobortis purus laoreet. Sed tincidunt erat enim, molestie scelerisque massa elementum eu. Nam ac neque pellentesque, commodo quam tristique, blandit lorem. Suspendisse tincidunt laoreet dictum. Integer pellentesque dui id augue dignissim condimentum. Nunc efficitur erat finibus tristique dignissim.</p> <p>Curabitur at mi id odio venenatis rutrum. Etiam sit amet velit eu nisl dictum viverra sit amet ac nisi. Morbi vel placerat nisl, eu ornare velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eros ex, elementum id aliquet in, dictum nec arcu. Phasellus in eros suscipit urna aliquet varius. Nulla facilisi. Integer justo diam, gravida eget ligula sit amet, tincidunt facilisis dui. Vivamus sollicitudin odio sit amet magna ultricies fringilla. Vivamus odio tellus, tristique a rhoncus eu, pretium eu ligula. Sed eu ipsum eget odio lacinia tincidunt nec non est. Quisque dolor neque, accumsan at diam in, eleifend faucibus dui.</p>",
                    "shop_id" => $shopId,
                    "status" => 1,
                ]
            ];

            DB::table('cms')->insert($cms);

            $theme = [
                "theme_id" => 1,
                "shop_id" => $shopId,
            ];

            DB::table('shop_themes')->insert($theme);


        }

    }
}
