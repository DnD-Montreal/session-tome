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
        $season = str_pad($this->faker->numberBetween(1, 11), 2, "0", STR_PAD_LEFT);
        $series = str_pad($this->faker->numberBetween(1, 15), 2, "0", STR_PAD_LEFT);
        $count = Adventure::count();
        return [
            'title' => $this->faker->sentence(4),
            'code' => "DD" . $this->faker->randomElement($suffix) . "{$season}-{$series}-{$count}",
            'description' => $this->faker->text(),
        ];
    }
}
