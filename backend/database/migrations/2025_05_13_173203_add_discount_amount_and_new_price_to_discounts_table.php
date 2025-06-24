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
        Schema::table('discounts', function (Blueprint $table) {
            $table->decimal('discount_amount', 10, 2)->nullable(); 
            $table->decimal('new_price', 10, 2)->nullable(); 
        });
    }

    public function down()
    {
        Schema::table('discounts', function (Blueprint $table) {
            $table->dropColumn(['discount_amount', 'new_price']);
        });
    }

};
