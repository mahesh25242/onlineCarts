<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ShopCategorySeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	$data = array(
            array(
                'name' => 'Bakery',
                'description' => 'Bakery',
                "status" => 1,
                "sortorder"  => 1,
                "image" => NULL,
            ),
            array(
                'name' => 'Restaurant',
                'description' => 'Restaurant',
                "status" => 1,
                "sortorder"  => 1,
                "image" => NULL,
            ),
		);

        foreach($data as $dt){
            if(DB::table('shop_categories')->where('name', trim($dt["name"]))->doesntExist()){
                DB::table('shop_categories')->insert($dt);
            }
        }


	}
}
