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
        $races = [
            "Dwarf",
            "Elf",
            "Halfling",
            "Human",
            "Dragonborn",
            "Gnome",
            "Half-Elf",
            "Half-Orc",
            "Tiefling",
        ];

        $classes = [
            "Barbarian",
            "Bard",
            "Cleric",
            "Druid",
            "Fighter",
            "Monk",
            "Paladin",
            "Ranger",
            "Rogue",
            "Sorcerer",
            "Warlock",
            "Wizard",
        ];

        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'race' => $this->faker->randomElement($races),
            'class' => $this->faker->randomElement($classes),
            'level' => $this->faker->numberBetween(1, 20),
            'faction' => $this->faker->randomElement(array_values(Character::FACTIONS)),
            'downtime' => $this->faker->numberBetween(0, 1000),
            'character_sheet' => $this->faker->url(),
            'status' => $this->faker->randomElement(['private', 'public']),
        ];
    }
}
