<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class ImportAdventuresTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function adventures_can_be_imported_from_a_csv()
    {
        // Move fake CSV to correct directory
        Storage::put('adventures/test-adventures.csv', file_get_contents(database_path('mocks/test-adventures.csv')));

        // run import
        $this->artisan('adventures:import');

        // check DB contains records
        $this->assertDatabaseHas('adventures', ['code' => 'DDAL00-TEST01', 'title' => 'Test Adventure 1', 'tier' => 1]);
        $this->assertDatabaseHas('adventures', ['code' => 'DDAL00-TEST02', 'title' => 'Test Adventure 2', 'tier' => 2]);
        $this->assertDatabaseHas('adventures', ['code' => 'DDAL00-TEST03', 'title' => 'Test Adventure 3', 'tier' => 3]);
        $this->assertDatabaseHas('adventures', ['code' => 'DDAL00-TEST04', 'title' => 'Test Adventure 4', 'tier' => 4]);

        // clean up fake csv
        Storage::delete('adventures/test-adventures.csv');
    }
}
