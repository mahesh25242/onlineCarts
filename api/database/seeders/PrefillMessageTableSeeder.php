<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrefillMessageTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	$preFillMsgs = array(
            array('name' => 'shop payment pending','subject' => 'Payment Due', 'message' => 'The subscription for this shop has expired. If you are the owner of this shop please make payment to continue our service. This shop will be permanently deleted if your subscription is not renewed. You can make payment after login to this shop\'s admin panel', 'is_default' => 1)
		);

        foreach($preFillMsgs as $pmsg){
            if(DB::table('prefill_messages')->where('name', trim($pmsg["name"]))->doesntExist()){
                DB::table('prefill_messages')->insert($pmsg);
            }
        }


	}
}
