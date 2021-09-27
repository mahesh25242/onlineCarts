<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	$roles = array(
            array('name' => 'Super User','status' => 1, 'description' => 'Super user can handle entire site'),
            array('name' => 'Admin','status' => 1, 'description' => 'its Shop Admin')
		);

        foreach($roles as $rle){
            if(DB::table('roles')->where('name', trim($rle["name"]))->doesntExist()){
                DB::table('roles')->insert($rle);
            }
        }

	}

}
