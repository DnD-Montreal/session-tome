<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadesToItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();
            $table->dropForeign('items_character_id_foreign');
            $table->dropForeign('items_entry_id_foreign');

            // If a character with items still attached is deleted, remove the associated items via a cascade constraint.

            $table->foreign('character_id')
                ->references('id')
                ->on('characters')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            // Same concept as above, if an entry is deleted, remove the associated items.
            $table->foreign('entry_id')
                ->references('id')
                ->on('entries')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            Schema::enableForeignKeyConstraints();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();

            $table->dropForeign('items_character_id_foreign');
            $table->dropForeign('items_entry_id_foreign');

            $table->foreign('character_id')
                ->references('id')
                ->on('characters');

            $table->foreign('entry_id')
                ->references('id')
                ->on('entries');

            Schema::enableForeignKeyConstraints();
        });
    }
}
