<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Role();
        $admin->type = Role::SITE_ADMIN;
        $admin->name = ucwords(Role::SITE_ADMIN);
        $admin->save();

        $admin = new Role();
        $admin->type = Role::LEAGUE_ADMIN;
        $admin->name = ucwords(Role::LEAGUE_ADMIN);
        $admin->save();
    }
}
