<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopDeliverySlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_delivery_slots', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('shop_id')->default(0);
            $table->string('name')->nullable()->index();
            $table->boolean('is_default')->default(0);
            $table->integer('sortorder')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_delivery_slots');
    }
}
