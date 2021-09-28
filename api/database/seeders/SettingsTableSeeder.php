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
            array('name' => 'site_name','value' => 'Cart', 'description' => 'This is the onlinecart name'),
            array('name' => 'email','value' => 'info@cart.com',  'description' => 'This is the onlinecart email to communication '),
            array('name' => 'shop_expiry','value' => '60', 'description' => 'shop default expiry this will take if no packages exists in db. rare case to took this'),
            array('name' => 'ticket_mail','value' => 'mahesh25242@gmail.com', 'description'=> 'ticket related things will sent to this email'),
            array('name' => 'shop_expiry_email','value' => 'mahesh25242@gmail.com', 'description' => 'Any shop expired then that notification will sent to this email'),
            array('name' => 'mobile','value' => '+919995453566', 'description' => 'onlinecart contact phone.'),
            array('name' => 'address','value' => 'Andoor Kottayam - 686635', 'description' => 'onlinecart office address.'),
            array('name' => 'ded_line_days','value' => '15', 'description' => 'once a shop is expired its package then that shop will keep all its data till this days of after expiration. after this it will delete permanantly'),
            array('name' => 'payment_upi','value' => 'onlinecarts@axl', 'description' => 'each shop can send their package amount or any service charge with online cart can sent to this upi id. its registered in phonepe'),
            array('name' => 'payment_qr_code','value' => 'https://api.onlinecarts.in/assets/general/upi.jpeg', 'description' => 'each shop can send their package amount or any service charge with online cart can sent to this upi QR code. its registered in phonepe'),
            array('name' => 'shop_block_report_abuse_count','value' => '10',  'description' => 'If shop is not submitted any id proof then if a particular shop get this report abuse request it will block that shop'),
		);

        foreach($settings as $stng){
            if(DB::table('settings')->where('name', trim($stng["name"]))->doesntExist()){
                DB::table('settings')->insert($stng);
            }
        }


	}
}
