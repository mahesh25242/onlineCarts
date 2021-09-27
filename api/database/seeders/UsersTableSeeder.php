<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
    if(DB::table('user_roles')->where('role_id', '1')->doesntExist()){

        $input = [
            'fname' => 'Super',
            'lname' => 'User',
            'status' => 1,
            'email' => 'admin@cart.com',
            'password' => Hash::make('123456'),
            'phone' => '123456'
        ];
        $user = \App\Models\User::create($input);


        \App\Models\UserRole::updateOrCreate(
            [
                "role_id" => 1,
                "user_id" => $user->id
            ],
            [
                "role_id" => 1,
                "user_id" => $user->id
            ]
        );

    }

	}
}
