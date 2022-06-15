<?php

namespace App\Console\Commands;

use App\Imports\AdvenutreImport;
use App\Models\Adventure;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class ImportAdventures extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'adventures:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create entries for all adventures from CSVs in the storage/app/adventures directory';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $files = Storage::disk('local')->files('adventures');
        $fileCount = count($files);
        $bar = $this->output->createProgressBar($fileCount);
        $this->info("Importing Adventures from {$fileCount} CSVs.");
        $bar->start();

        foreach ($files as $file) {
            Excel::import(new AdvenutreImport(), $file);
            $bar->advance();
        }

        $bar->finish();

        $adventureCount = Adventure::count();
        $this->info("\nImport Complete, {$adventureCount} adventures created / Updated.");

        return Command::SUCCESS;
    }
}
