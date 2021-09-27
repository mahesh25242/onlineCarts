<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ThemesSeeder extends Seeder
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
                'name' => 'Default Theme',
                "class" => 'shop-default-light-theme',
                "theme_color" => '#455a64',
                "background_color" => '#455a64',
                "is_default" => 1,
            ),
            array(
                'name' => 'Green Theme',
                "class" => 'shop-default-green-light-theme',
                "theme_color" => '#00c853',
                "background_color" => '#00c853',
                "is_default" => 0,
            ),
            array(
                'name' => 'Pink Theme',
                "class" => 'shop-default-pink-light-theme',
                "theme_color" => '#c51162',
                "background_color" => '#c51162',
                "is_default" => 0,
            ),
            array(
                'name' => 'purple Theme',
                "class" => 'shop-default-purple-light-theme',
                "theme_color" => '#aa00ff',
                "background_color" => '#aa00ff',
                "is_default" => 0,
            ),
            array(
                'name' => 'Deep Purple',
                "class" => 'shop-default-deep-purple-light-theme',
                "theme_color" => '#6200ea',
                "background_color" => '#6200ea',
                "is_default" => 0,
            ),
            array(
                'name' => 'Indigo Theme',
                "class" => 'shop-default-indigo-light-theme',
                "theme_color" => '#304ffe',
                "background_color" => '#304ffe',
                "is_default" => 0,
            ),
            array(
                'name' => 'Blue Theme',
                "class" => 'shop-default-blue-light-theme',
                "theme_color" => '#2962ff',
                "background_color" => '#2962ff',
                "is_default" => 0,
            ),
            array(
                'name' => 'Light Blue',
                "class" => 'shop-default-light-blue-light-theme',
                "theme_color" => '#0091ea',
                "background_color" => '#0091ea',
                "is_default" => 0,
            ),
            array(
                'name' => 'Cyan Theme',
                "class" => 'shop-default-cyan-light-theme',
                "theme_color" => '#00b8d4',
                "background_color" => '#00b8d4',
                "is_default" => 0,
            ),
            array(
                'name' => 'Teal Theme',
                "class" => 'shop-default-teal-light-theme',
                "theme_color" => '#00bfa5',
                "background_color" => '#00bfa5',
                "is_default" => 0,
            ),
            array(
                'name' => 'Light Green Theme',
                "class" => 'shop-default-light-green-light-theme',
                "theme_color" => '#64dd17',
                "background_color" => '#64dd17',
                "is_default" => 0,
            ),
            array(
                'name' => 'Lime Theme',
                "class" => 'shop-default-lime-light-theme',
                "theme_color" => '#aeea00',
                "background_color" => '#aeea00',
                "is_default" => 0,
            ),
            array(
                'name' => 'Yellow Theme',
                "class" => 'shop-default-yellow-theme',
                "theme_color" => '#ffd600',
                "background_color" => '#ffd600',
                "is_default" => 0,
            ),
            array(
                'name' => 'Amber Theme',
                "class" => 'shop-default-amber-theme',
                "theme_color" => '#ffab00',
                "background_color" => '#ffab00',
                "is_default" => 0,
            ),
            array(
                'name' => 'Orange Theme',
                "class" => 'shop-default-orange-theme',
                "theme_color" => '#ff6d00',
                "background_color" => '#ff6d00',
                "is_default" => 0,
            ),
            array(
                'name' => 'Deep Orange',
                "class" => 'shop-default-deep-orange-theme',
                "theme_color" => '#dd2c00',
                "background_color" => '#dd2c00',
                "is_default" => 0,
            ),
            array(
                'name' => 'Brown Theme',
                "class" => 'shop-default-brown-theme',
                "theme_color" => '#5d4037',
                "background_color" => '#5d4037',
                "is_default" => 0,
            ),
            array(
                'name' => 'Gray Theme',
                "class" => 'shop-default-grey-theme',
                "theme_color" => '#616161',
                "background_color" => '#616161',
                "is_default" => 0,
            ),
            array(
                'name' => 'Bue Gray',
                "class" => 'shop-default-blue-gray-theme',
                "theme_color" => '#455a64',
                "background_color" => '#455a64',
                "is_default" => 0,
            ),
		);

        foreach($data as $dt){
            if(DB::table('themes')->where('name', trim($dt["name"]))->doesntExist()){
                DB::table('themes')->insert($dt);
            }
        }


	}
}
