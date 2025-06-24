<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('seller_id')->nullable();
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('unit_id')->nullable();
            
            $table->string('product_name');
            $table->string('product_ref')->unique();
            $table->text('product_description')->nullable();
            $table->decimal('product_price', 10, 2);
            $table->integer('product_stock')->default(0);
            $table->integer('product_minimum_commande')->default(1);
            $table->enum('product_status', ['published', 'hidden'])->default('hidden');
            $table->string('video_path')->nullable();
            $table->text('video_description')->nullable();
            $table->json('key_words')->nullable();
            
            $table->timestamps();

            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('unit_id')->references('id')->on('units')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
