<?php

namespace App\Imports;

use App\Models\Adventure;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithUpserts;

class AdvenutreImport implements ToModel, WithUpserts
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if (!isset($row[0]) || Str::contains($row[0], 'Adventure')) {
            return null;
        }

        return new Adventure([
            'code' => trim($row[0]),
            'title' => trim($row[1]),
            'tier' => $this->determineTier($row[3])
        ]);
    }

    public function uniqueBy(): string
    {
        return "code";
    }

    private function determineTier($level): int
    {
        return 1 + intval($level >= 5) + intval($level >= 11) + intval($level >= 16);
    }
}
