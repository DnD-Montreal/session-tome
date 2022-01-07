<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StreamCsvFile
{
    use AsAction;

    /**
     * Creates a response stream that downloads a CSV consisting of passed data to the users browser
     * @param $columns
     * @param $data
     * @param $suffix
     * @return StreamedResponse
     */
    public function handle($columns, $data, $suffix)
    {
        $filename = now()->toDateString() . "-{$suffix}.csv";
        $headers = ['Content-Disposition' => "attachement; filename={$filename}"];

        return response()->stream(function () use ($columns, $data) {
            $file = fopen('php://output', 'w+');
            fputcsv($file, $columns);

            foreach ($data as $row) {
                fputcsv($file, $row);
            }

            fclose($file);
        }, 200, $headers);
    }
}
