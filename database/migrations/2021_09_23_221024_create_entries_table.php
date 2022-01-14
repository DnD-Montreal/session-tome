<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('adventure_id')->constrained();
            $table->foreignId('campaign_id')->constrained();
            $table->foreignId('character_id')->constrained();
            $table->foreignId('event_id')->constrained();
            $table->foreignId('dungeon_master_id')->constrained('users');
            $table->string('dungeon_master');
            $table->timestamp('date_played');
            $table->string('location');
            $table->string('type');
            $table->string('levels');
            $table->decimal('gp', 32, 2);
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('entries');
        Schema::disableForeignKeyConstraints();
    }
}
