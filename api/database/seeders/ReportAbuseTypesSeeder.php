<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ReportAbuseTypesSeeder extends Seeder
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
                'name' => 'Try to sell restricted items',
                "description" => 'Liquor, Weapons, Currency, Fireworks, Medical devices, Medicines, Tobacco, Pesticides, Steroids',
                "status" => 1,
            ),
            array(
                'name' => 'Anti National Elements',
                "description" => NULL,
                "status" => 1,
            ),
            array(
                'name' => 'Try to Sell anti Religion items',
                "description" => NULL,
                "status" => 1,
            ),
            array(
                'name' => 'Others',
                "description" => NULL,
                "status" => 1,
            ),
		);

        foreach($data as $dt){
            if(DB::table('report_abuse_types')->where('name', trim($dt["name"]))->doesntExist()){
                DB::table('report_abuse_types')->insert($dt);
            }
        }


	}
}
