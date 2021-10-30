<?php

namespace Http\Controllers;

use App\Http\Controllers\DMEntryController;
use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class DMEntryControllerTest extends TestCase
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
        $entry = Entry::factory(2)->create([
            'type' => Entry::TYPE_DM,
        ]);

        $response = $this->get(route('dm-entry.index'));

        $response->assertOk();
        $response->assertViewIs('entry.index');
        $response->assertViewHas('entries');

        $responseEntries = $response->viewData('entries');

        foreach ($responseEntries as $responseEntry) {
            $this->assertEquals(Entry::TYPE_DM, $responseEntry->type);
        }

        $this->assertTrue($responseEntries->count() >= 2);
    }
}
