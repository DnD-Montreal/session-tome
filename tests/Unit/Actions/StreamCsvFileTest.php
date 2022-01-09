<?php

namespace Tests\Unit\Actions;

use App\Actions\StreamCsvFile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\TestCase;

class StreamCsvFileTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_csv_file_is_streamed_in_the_response()
    {
        $columns = $this->faker->words(5);
        $data = collect(array_fill(0, 10, 0))->map(function () {
            return $this->faker->words(5);
        });
        $today = now()->toDateString();
        $suffix = "test";

        $responseStream = TestResponse::fromBaseResponse(StreamCsvFile::run($columns, $data, $suffix));

        $responseStream->assertOk();
        $responseStream->assertDownload("$today}-{$suffix}.csv");
    }
}