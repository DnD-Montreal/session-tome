<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Author;
use App\Models\Entry;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

    /**
     * @test
     */
    public function index_displays_view()
    {
        $ratings = Rating::factory()->count(3)->create();

        $response = $this->get(route('rating.index'));

        $response->assertOk();
        $response->assertViewIs('rating.index');
        $response->assertViewHas('ratings');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('rating.create'));

        $response->assertOk();
        $response->assertViewIs('rating.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\RatingController::class,
            'store',
            \App\Http\Requests\RatingStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $entry = Entry::factory()->create();
        $user = User::factory()->create();
        $author = Author::factory()->create();
        $score = $this->faker->word;

        $response = $this->post(route('rating.store'), [
            'entry_id' => $entry->id,
            'user_id' => $user->id,
            'author_id' => $author->id,
            'score' => $score,
        ]);

        $ratings = Rating::query()
            ->where('entry_id', $entry->id)
            ->where('user_id', $user->id)
            ->where('author_id', $author->id)
            ->where('score', $score)
            ->get();
        $this->assertCount(1, $ratings);
        $rating = $ratings->first();

        $response->assertRedirect(route('rating.index'));
        $response->assertSessionHas('rating.id', $rating->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $rating = Rating::factory()->create();

        $response = $this->get(route('rating.show', $rating));

        $response->assertOk();
        $response->assertViewIs('rating.show');
        $response->assertViewHas('rating');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $rating = Rating::factory()->create();

        $response = $this->get(route('rating.edit', $rating));

        $response->assertOk();
        $response->assertViewIs('rating.edit');
        $response->assertViewHas('rating');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\RatingController::class,
            'update',
            \App\Http\Requests\RatingUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $rating = Rating::factory()->create();
        $entry = Entry::factory()->create();
        $user = User::factory()->create();
        $author = Author::factory()->create();
        $score = $this->faker->word;

        $response = $this->put(route('rating.update', $rating), [
            'entry_id' => $entry->id,
            'user_id' => $user->id,
            'author_id' => $author->id,
            'score' => $score,
        ]);

        $rating->refresh();

        $response->assertRedirect(route('rating.index'));
        $response->assertSessionHas('rating.id', $rating->id);

        $this->assertEquals($entry->id, $rating->entry_id);
        $this->assertEquals($user->id, $rating->user_id);
        $this->assertEquals($author->id, $rating->author_id);
        $this->assertEquals($score, $rating->score);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $rating = Rating::factory()->create();

        $response = $this->delete(route('rating.destroy', $rating));

        $response->assertRedirect(route('rating.index'));

        $this->assertDeleted($rating);
    }
}
