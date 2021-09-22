<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportAbusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_abuses', function (Blueprint $table) {
            $table->id();
            $table->integer('report_abuse_type_id')->nullable();
            $table->foreignId('shop_id')->constrained('shops');
            $table->string('url')->nullable();
            $table->string('name')->nullable();
            $table->longText('content')->nullable();
            $table->bigInteger('shop_product_id')->nullable();
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
        Schema::dropIfExists('report_abuses');
    }
}
