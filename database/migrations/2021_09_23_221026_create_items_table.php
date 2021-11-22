<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entry_id')->constrained();
            $table->foreignId('character_id')->constrained();
            $table->string('name', 500);
            $table->enum('rarity', ["common","uncommon","rare","very_rare","legendary"]);
            $table->string('tier');
            $table->text('description');
            $table->string('counted');
            $table->timestamps();
            $table->foreignId('author_id')->constrained('users', 'id');
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
        Schema::dropIfExists('items');
    }
}
