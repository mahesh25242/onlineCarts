<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	$settings = array(
            array('name' => 'site_name','value' => 'Cart'),
            array('name' => 'email','value' => 'info@cart.com'),
            array('name' => 'shop_expiry','value' => '60'),
            array('name' => 'ticket_mail','value' => 'mahesh25242@gmail.com'),
            array('name' => 'shop_expiry_email','value' => 'mahesh25242@gmail.com'),
            array('name' => 'mobile','value' => '+919995453566'),
            array('name' => 'address','value' => 'Andoor Kottayam - 686635'),
            array('name' => 'ded_line_days','value' => '15'),
            array('name' => 'payment_upi','value' => 'onlinecarts@axl'),
            array('name' => 'payment_qr_code','value' => 'https://api.onlinecarts.in/assets/general/upi.jpeg'),
		);

        foreach($settings as $stng){
            if(DB::table('settings')->where('name', trim($stng["name"]))->doesntExist()){
                DB::table('settings')->insert($stng);
            }
        }


	}
}
