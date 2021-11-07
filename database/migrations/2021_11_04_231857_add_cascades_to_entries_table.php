<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadesToEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entries', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();
            $table->dropForeign('entries_user_id_foreign');
            $table->dropForeign('entries_adventure_id_foreign');
            $table->dropForeign('entries_campaign_id_foreign');
            $table->dropForeign('entries_character_id_foreign');
            $table->dropForeign('entries_event_id_foreign');
            $table->dropForeign('entries_dungeon_master_id_foreign');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('adventure_id')
                ->references('id')
                ->on('adventures')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('campaign_id')
                ->references('id')
                ->on('campaigns')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('character_id')
                ->references('id')
                ->on('characters')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('event_id')
                ->references('id')
                ->on('events')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreign('dungeon_master_id')
                ->references('id')
                ->on('users')
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
        Schema::table('entries', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();
            $table->dropForeign('entries_user_id_foreign');
            $table->dropForeign('entries_adventure_id_foreign');
            $table->dropForeign('entries_campaign_id_foreign');
            $table->dropForeign('entries_character_id_foreign');
            $table->dropForeign('entries_event_id_foreign');
            $table->dropForeign('entries_dungeon_master_id_foreign');

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('adventure_id')
                ->references('id')
                ->on('adventures');

            $table->foreign('campaign_id')
                ->references('id')
                ->on('campaigns');

            $table->foreign('character_id')
                ->references('id')
                ->on('characters');

            $table->foreign('event_id')
                ->references('id')
                ->on('events');

            $table->foreign('dungeon_master_id')
                ->references('id')
                ->on('users');

            Schema::enableForeignKeyConstraints();
        });
    }
}
