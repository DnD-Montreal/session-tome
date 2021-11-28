<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
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
        $dm = User::factory()->create();
        $characters = [];

        foreach ($users as $user) {
            $characters = Character::factory(6)->create([
                 'user_id' => $user->id,
                 'level' => 1
             ])->merge($characters);

            Entry::factory(rand(1, 7))->create([
                'user_id' => $user->id,
                'type' => Entry::TYPE_DM,
                'levels' => rand(0, 1),
                'character_id' => null
            ]);
        }

        foreach ($characters as $character) {
            Entry::factory(10)->create([
                'character_id' => $character->id,
                'user_id' => $character->user->id,
                'levels' => random_int(0, 1),
                'dungeon_master_id' => $dm->id
            ]);
        }

        foreach (Entry::all() as $entry) {
            if ($entry->type == Entry::TYPE_DM && $entry->levels < 1) {
                Item::factory(rand(0, 1))->create([
                    'entry_id' => $entry->id,
                    'character_id' => $entry->character_id,
                    'author_id' => $entry->user_id
                ]);
            }
        }
    }
}
