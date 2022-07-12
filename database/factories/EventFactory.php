<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\League;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'league_id' => League::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->text(),
            'location' => $this->faker->word(),
        ];
    }
}
