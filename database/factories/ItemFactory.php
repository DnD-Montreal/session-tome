<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\User;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'entry_id' => Entry::factory(),
            'character_id' => Character::factory(),
            'name' => $this->faker->words(rand(1, 3), true),
            'rarity' => $this->faker->randomElement(["common","uncommon","rare","very_rare","legendary"]),
            'tier' => $this->faker->numberBetween(1, 4),
            'description' => $this->faker->text(),
            'author_id' => User::factory()
        ];
    }
}
