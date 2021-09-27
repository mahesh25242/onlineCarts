<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PackagesSeeder extends Seeder
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
                'name' => '1 Month Subscription ( Free Trial )',
                "description" => 'This package is for the new customers. This package contains all the features of onlinecats that you can check and also analyse is it worth for you while you purchase.',
                "price" => 0,
                "duration" => 1,
                "status" => 1,
            ),
            array(
                'name' => 'Half Year Subscription',
                "description" => 'This package contain 6 months subscription of all features.',
                "price" => 2500.00,
                "duration" => 6,
                "status" => 1,
            ),
            array(
                'name' => 'Yearly Subscription',
                "description" => 'This package contain 12 months subscription of all features.',
                "price" => 5000.00,
                "duration" => 12,
                "status" => 1,
            )
		);

        foreach($data as $dt){
            if(DB::table('packages')->where('name', trim($dt["name"]))->doesntExist()){
                DB::table('packages')->insert($dt);
            }
        }


	}
}
