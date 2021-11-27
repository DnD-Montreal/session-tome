<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNullablesToItemsTable extends Migration
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
            // not included in scope anymore due to season 11 rules
            $table->dropColumn('counted');

            $table->text('description')->nullable()->change();
            $table->string('tier')->nullable()->change();
            $table->unsignedBigInteger('character_id')->nullable()->change();
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
            $table->string('counted');
            $table->text('description')->change();
            $table->string('tier')->change();
            $table->dropForeign(['character_id']);
            $table->unsignedBigInteger('character_id')->change();
            Schema::enableForeignKeyConstraints();
        });
    }
}
