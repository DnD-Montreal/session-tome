<?php

namespace Database\Factories;

use Carbon\Carbon;
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
        $startTime = $this->faker->dateTimeBetween("-5 Years");

        return [
            'event_id' => Event::factory(),
            'adventure_id' => Adventure::factory(),
            'dungeon_master_id' => User::factory(),
            'table' => $this->faker->randomDigit()+1,
            'seats' => $this->faker->numberBetween(2, 8),
            'start_time' => $startTime,
            'end_time' => $this->faker->dateTimeBetween($startTime),
            'language' => $this->faker->randomElement(["FR","EN"]),
        ];
    }
}
