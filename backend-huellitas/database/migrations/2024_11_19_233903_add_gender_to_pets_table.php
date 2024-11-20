<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->string('gender')->after('user_id')->nullable(); // Agrega la columna después de user_id
        });
    }
    
    public function down()
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->dropColumn('gender'); // Elimina la columna si se revierte la migración
        });
    }
    
    

};
