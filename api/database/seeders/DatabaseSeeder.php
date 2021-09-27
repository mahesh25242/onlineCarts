<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CountriesTableSeeder::class);
        $this->call(StatesTableSeeder::class);
        $this->call(CitiesTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ShopCategorySeeder::class);
        $this->call(ShopsTableSeeder::class);
        $this->call(PrefillMessageTableSeeder::class);
        $this->call(ShopHelpTicketTypesSeeder::class);
        $this->call(PackagesSeeder::class);
        $this->call(ReportAbuseTypesSeeder::class);
        $this->call(ThemesSeeder::class);

    }
}
