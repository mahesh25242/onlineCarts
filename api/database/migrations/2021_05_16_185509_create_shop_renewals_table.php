<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopRenewalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_renewals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('shop_id')->default(0);
            $table->double('amount', 8 , 2)->default(0);
            $table->dateTime('from_date')->nullable();
            $table->dateTime('to_date')->nullable();
            $table->boolean('status')->default(1);
            $table->integer('package_id')->nullable();
            $table->string('attachement')->nullable();
            $table->string('comments')->nullable();
            $table->double('coins_used', 8 , 2)->nullable();
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
        Schema::dropIfExists('shop_renewals');
    }
}
