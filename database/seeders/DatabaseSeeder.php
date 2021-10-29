<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\Entry;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory(10)->create();
        $ids = $users->pluck('id');

        foreach ($users as $user) {
            $character = Character::factory()->create([
                 'user_id' => $user->id,
                 'level' => 1
             ]);
            Entry::factory(random_int(1, 20))->create([
                 'user_id' => $user->id,
                 'character_id' => $character->id,
                 'dungeon_master_id' => $ids->diff([$user->id])->values()[random_int(0, $ids->count()-3)],
                 'levels' => 1
             ]);
        }
    }
}
