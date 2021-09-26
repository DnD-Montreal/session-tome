<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Character;

class CharacterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Character::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'race' => $this->faker->word(),
            'class' => $this->faker->word(),
            'level' => $this->faker->word(),
            'faction' => $this->faker->word(),
            'downtime' => $this->faker->word(),
            'status' => $this->faker->word(),
        ];
    }
}
