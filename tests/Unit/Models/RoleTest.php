<?php

namespace Tests\Unit\Models;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function belongs_to_users()
    {
        $user = User::factory(1)->create();
        $role = Role::factory(1)->create()[0];

        $role->users()->attach($user);

        $this->assertCount(1, $role->users()->get());
    }
}
