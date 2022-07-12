<?php

namespace Tests\Unit\Policies;

use App\Models\Entry;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EntryPolicyTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function an_entry_can_be_updated_by_appropriate_user()
    {
        $ownerUser = User::factory()->create();
        $otherUser = User::factory()->create();

        $entry = Entry::factory()->create();

        $entry->user()->associate($ownerUser)->save();

        $admin = Role::factory()->create([
            'type' => Role::SITE_ADMIN,
        ]);
        $adminUser = User::factory()->create();
        $adminUser->roles()->save($admin);

        $this->assertTrue($ownerUser->can('update', $entry));
        $this->assertFalse($otherUser->can('update', $entry));
        $this->assertTrue($adminUser->can('update', $entry));
    }

    /**
     * @test
     */
    public function an_entry_can_be_deleted_by_appropriate_user()
    {
        $ownerUser = User::factory()->create();
        $otherUser = User::factory()->create();

        $entry = Entry::factory()->create();

        $entry->user()->associate($ownerUser)->save();

        $admin = Role::factory()->create([
            'type' => Role::SITE_ADMIN,
        ]);
        $adminUser = User::factory()->create();
        $adminUser->roles()->save($admin);

        $this->assertTrue($ownerUser->can('delete', $entry));
        $this->assertFalse($otherUser->can('delete', $entry));
        $this->assertTrue($adminUser->can('delete', $entry));
    }
}
