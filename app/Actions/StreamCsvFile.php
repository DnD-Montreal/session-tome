<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class StreamCsvFile
{
    use AsAction;

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
