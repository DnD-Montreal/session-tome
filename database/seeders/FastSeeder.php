<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\Item;
use App\Models\League;
use App\Models\Rating;
use App\Models\Role;
use App\Models\Session;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class FastSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $defaultUser = User::factory()->hasAttached(Role::first())->create([
            'email' => 'default@test.com',
            'name' => "Test account"
        ]);

        $dndmtl = League::factory()->create([
            'name' => "DnD MTL"
        ]);

        $leagueAdminUser = User::factory()
            ->hasAttached(Role::where('name', Role::LEAGUE_ADMIN)->first(), ['league_id' => $dndmtl->id])
            ->create([
                'email' => 'league_default@test.com',
                'name' => "League Admin Test account"
            ]);

        $users = User::factory(3)->create()->prepend($leagueAdminUser)->prepend($defaultUser);
        $dm = User::factory(2)->create();
        $events = Event::factory(2)->create([
            'league_id' => $dndmtl->id
        ]);

        // add all users to our League
        $dndmtl->users()->saveMany($users->merge($dm));

        $sessions = $this->generateSessions($events, $dm);
        $characters = $this->generateCharacters($users->merge($dm), $events);
        $campaigns = $this->generateCampaigns($dm, $users);
        $entries = $this->generateEntries($characters, $sessions, $dm);
        $this->generateEntryMeta($entries);
    }

    /**
     * @param Collection $users
     * @param Collection $events
     * @return array|Collection|Model
     */
    private function generateCharacters(Collection $users, Collection $events)
    {
        $characters = [];

        foreach ($users as $user) {
            $characters = Character::factory(6)->create([
                'user_id' => $user->id,
                'level' => 1
            ])->merge($characters);

            // Everyone has DMed at least 1 "home-game"
            Entry::factory(rand(1, 3))->create([
                'user_id' => $user->id,
                'type' => Entry::TYPE_DM,
                'levels' => rand(0, 1),
                'event_id' => null,
                'character_id' => null,
                'dungeon_master_id' => null,
                'campaign_id' => null
            ]);
        }
        return $characters;
    }

    /**
     * @param Collection $characters
     * @param Collection $sessions
     * @param Collection $dms
     * @return Collection
     * @throws \Exception
     */
    private function generateEntries(Collection $characters, Collection $sessions, Collection $dms): Collection
    {
        $entries = [];

        foreach ($characters as $character) {
            $session = $sessions->random();
            $dm = $dms->random();
            $defaults = [
                'character_id' => $character->id,
                'user_id' => $character->user->id,
                'levels' => random_int(0, 1),
                'campaign_id' => null
            ];

            $items = Item::factory(rand(1, 2))->state([
                'character_id' => $character->id,
                'author_id' => $character->user_id
            ]);
            // Session Entries --> Player played this character at an event
            $entries = Entry::factory(2)
                ->has($items)
                ->create(array_merge([
                    'adventure_id' => $session->adventure_id,
                    'dungeon_master_id' => $session->dungeon_master_id,
                    'event_id' => $session->event_id
                ], $defaults))->merge($entries);

            // Regular Entries --> Home games
            $entries = Entry::factory(3)->create(array_merge([
                'dungeon_master_id' => $dm->id,
                'event_id' => null
            ], $defaults))->merge($entries);
        }

        return $entries;
    }

    /**
     * @param Collection $entries
     */
    private function generateEntryMeta(Collection $entries): void
    {
        foreach ($entries as $entry) {
            if ($entry->type == Entry::TYPE_DM && $entry->levels < 1) {
                // If a DM entry doesn't grant levels then it should grant an items
                Item::factory(rand(0, 3))->create([
                    'entry_id' => $entry->id,
                    'character_id' => $entry->character_id,
                    'author_id' => $entry->user_id
                ]);
            } elseif ($entry->dungeon_master_id) {
                // If a game has DM the user should rate them
                Rating::factory()->create([
                    'entry_id' => $entry->id,
                    'user_id' => $entry->dungeon_master_id,
                    'author_id' => $entry->user_id
                ]);
            }
        }
    }

    /**
     * @param Collection $events
     * @param Collection $dm
     * @return array|Collection|Model
     */
    private function generateSessions(Collection $events, Collection $dm)
    {
        $sessions = [];

        // Each event will have 3 sessions being run at them
        foreach ($events as $event) {
            $seats = rand(3, 8);
            $sessions = Session::factory(3)
                ->has(Character::factory($seats - rand(1, 3)))
                ->create([
                    'event_id' => $event->id,
                    'dungeon_master_id' => $dm->random()->id,
                    'seats' => $seats
                ])->merge($sessions);
        }
        return $sessions;
    }

    private function generateCampaigns($dms, $users)
    {
        $users = collect($users);
        $users->each(fn ($user) => $user->load('characters'));

        $initialMembers = $users->slice(1)->random(4);
        $campaigns = Campaign::factory(1)
            ->hasAttached($users[0], ['is_dm' => true, 'is_owner' => true])
            ->hasAttached($initialMembers)
            ->hasAttached($initialMembers->map(fn ($user) => $user->characters->random()))
            ->create();

        foreach ($dms as $dm) {
            $members = $users->random(4);
            $characters = $members->map(fn ($user) => $user->characters->random());

            $campaigns[] = Campaign::factory(2)
                ->hasAttached($dm, ['is_dm' => true])
                ->hasAttached($members)
                ->hasAttached($characters)
                ->create();
        }

        return $campaigns;
    }
}
