<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('age');
            $table->string('breed');
            $table->string('status');
            $table->unsignedBigInteger('breed_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('size_id');
            $table->boolean('sterilized');
            $table->string('location');
            $table->text('description');
            $table->string('gender_id');
            $table->string('tipo_mascota');
            $table->string('tamanio_mascota');
            $table->timestamps();

            $table->foreign('gender_id')->references('id')->on('gende')->onDelete('cascade');
            $table->foreign('breed_id')->references('id')->on('breeds')->onDelete('cascade');
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on(table: 'users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
