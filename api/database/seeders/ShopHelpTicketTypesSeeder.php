<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ShopHelpTicketTypesSeeder extends Seeder
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
                'name' => 'Billing',
                "status" => 1,
            ),
            array(
                'name' => 'Cancel & refund',
                "status" => 1,
            ),
            array(
                'name' => 'Bugs',
                "status" => 1,
            ),
            array(
                'name' => 'Change Request',
                "status" => 1,
            ),
            array(
                'name' => 'Others',
                "status" => 1,
            ),
		);

        foreach($data as $dt){
            if(DB::table('help_ticket_types')->where('name', trim($dt["name"]))->doesntExist()){
                DB::table('help_ticket_types')->insert($dt);
            }
        }


	}
}
