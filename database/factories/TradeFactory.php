<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Character;
use App\Models\Item;
use App\Models\Trade;

class TradeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Trade::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'item_id' => Item::factory(),
            'character_id' => Character::factory(),
            'requested_items' => $this->faker->word(),
            'description' => $this->faker->text(),
            'status' => $this->faker->randomElement(["open","closed"]),
        ];
    }
}
