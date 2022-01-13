<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Adventure;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;

class SessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'event_id' => Event::factory(),
            'adventure_id' => Adventure::factory(),
            'dungeon_master_id' => User::factory(),
            'table' => $this->faker->randomDigit()+1,
            'seats' => $this->faker->numberBetween(2, 8),
            'start_time' => $this->faker->dateTime(),
            'language' => $this->faker->randomElement(["FR","EN"]),
        ];
    }
}
