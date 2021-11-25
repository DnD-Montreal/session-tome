<?php

namespace Tests\Unit\Actions;

use App\Actions\CreateEntryItems;
use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CreateEntryItemsTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function items_can_be_created_in_bulk()
    {
        // Assign
        $entry = Entry::factory()->create();
        $itemData = [
            ['name' => "Longsword +1", 'rarity' => "uncommon"],
            ['name' => "Amulet of Health", 'rarity' => "rare", 'description' => "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher without it."],
        ];

        // Act
        $items = CreateEntryItems::run($entry, $itemData);

        // Assert
        $this->assertCount(2, $items);
        $this->assertDatabaseHas('items', $itemData[0]);
        $this->assertDatabaseHas('items', $itemData[1]);
        $this->assertEquals($itemData[0]['name'], $items[0]['name']);
        $this->assertEquals($itemData[0]['rarity'], $items[0]['rarity']);
        $this->assertEquals($itemData[1]['name'], $items[1]['name']);
        $this->assertEquals($itemData[1]['rarity'], $items[1]['rarity']);
        $this->assertEquals($itemData[1]['description'], $items[1]['description']);
    }
}
