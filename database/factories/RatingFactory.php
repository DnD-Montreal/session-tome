<?php

namespace Database\Factories;

use App\Models\Entry;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'entry_id' => Entry::factory(),
            'user_id' => User::factory(),
            'author_id' => User::factory(),
            'categories' => $this->faker->numberBetween(1, 31), //31 hardcoded because 5 categories all active would be 31 in binary (11111)
        ];
    }
}
