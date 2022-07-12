<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Entry;
use App\Models\Event;
use App\Models\Rating;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\AssertableInertia;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\RatingController
 */
class RatingControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function index_displays_view()
    {
        $users = User::factory(3)
            ->has(Rating::factory(3)
                ->has(Entry::factory()
                    ->has(Event::factory())))
            ->has(Session::factory())
            ->create();

        $response = $this->get(route('rating.index', [
            'name' => $users->first()->name,
            'search_language' => $users->first()->sessions->first()->language,
            'from_event' => $users->first()->ratings->first()->entry,
            'search_category' => 'CREATIVE',
        ]));

        $responseNoFilter = $this->get(route('rating.index'));

        $response->assertOk();
        $response->assertInertia(
            fn (AssertableInertia $page) => $page
            ->component("Rating/Rating")
            ->has('users')
        );
        $responseNoFilter->assertOk();
        $responseNoFilter->assertInertia(
            fn (AssertableInertia $page) => $page
            ->component("Rating/Rating")
            ->has('users')
        );
    }
}
