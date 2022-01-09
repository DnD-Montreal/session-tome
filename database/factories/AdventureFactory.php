<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Adventure;

class AdventureFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Adventure::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $suffix = ["HC", "AL", "EP"];
        return [
            'title' => $this->faker->sentence(4),
            'code' => "DD" . $this->faker->randomElement($suffix) . "-0{$this->faker->numberBetween(1, 9)}",
            'description' => $this->faker->text(),
        ];
    }
}
