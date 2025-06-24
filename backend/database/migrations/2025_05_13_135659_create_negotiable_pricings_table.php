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
        Schema::create('negotiable_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_pricing_id')->constrained()->onDelete('cascade');
            $table->decimal('minimum_price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('negotiable_pricings');
    }
};
