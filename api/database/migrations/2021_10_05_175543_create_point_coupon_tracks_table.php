<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePointCouponTracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('point_coupon_tracks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('point_coupon_id')->constrained('point_coupons');
            $table->foreignId('shop_id')->constrained('shops');
            $table->bigInteger('shop_point_tran_id')->default(0);
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
        Schema::dropIfExists('point_coupon_tracks');
    }
}
