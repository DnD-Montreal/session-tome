<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\User;

class EntryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Entry::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'adventure_id' => Adventure::factory(),
            'campaign_id' => Campaign::factory(),
            'character_id' => Character::factory(),
            'event_id' => Event::factory(),
            'dungeon_master_id' => User::factory(),
            'dungeon_master' => $this->faker->word(),
            'date_played' => $this->faker->dateTime(),
            'location' => $this->faker->word(),
            'type' => $this->faker->word(),
            'levels' => $this->faker->numberBetween(1, 20),
            'gp' => $this->faker->randomFloat(2, 0, 9999.99),
            'downtime' => $this->faker->numberBetween(1, 1000),
        ];
    }
}
