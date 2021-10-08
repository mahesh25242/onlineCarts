<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePointCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('point_coupons', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('shop_id')->default(0);
            $table->string('code')->nullable();
            $table->string('description')->nullable();
            $table->integer('no_use')->default(0);
            $table->double('point', 10, 2)->default(0);
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->boolean('status')->default(0);
            $table->tinyInteger('per_shop_use')->default(1);
            $table->boolean('fresh_use')->default(0);
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
        Schema::dropIfExists('point_coupons');
    }
}
