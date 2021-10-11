<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopPointTransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_point_trans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_point_id')->constrained('shop_points');
            $table->double('point', 8, 2)->default(0);
            $table->boolean('is_reference')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_point_trans');
    }
}
