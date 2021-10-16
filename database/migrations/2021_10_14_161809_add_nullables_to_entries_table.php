<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNullablesToEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entries', function (Blueprint $table) {
            $table->foreignId('adventure_id')->nullable()->change();
            $table->foreignId('campaign_id')->nullable()->change();
            $table->foreignId('character_id')->nullable()->change();
            $table->foreignId('event_id')->nullable()->change();
            $table->foreignId('dungeon_master_id')->nullable()->change();
            $table->string('dungeon_master')->nullable()->change();
            $table->dateTime('date_played')->nullable()->change();
            $table->string('location')->nullable()->change();
            $table->string('type')->nullable()->change();
            $table->decimal('gp', 32, 2)->default(0)->change();
            $table->integer('levels')->change()->default(0);
            $table->text('notes')->after('gp')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entries', function (Blueprint $table) {
            //
        });
    }
}
