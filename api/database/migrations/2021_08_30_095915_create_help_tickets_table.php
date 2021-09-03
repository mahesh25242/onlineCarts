<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHelpTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('help_ticket_type_id')->constrained('help_ticket_types');
            $table->bigInteger('parent')->default(0);
            $table->bigInteger('shop_id')->default(0);
            $table->string('subject')->nullable();
            $table->longText('content')->nullable();
            $table->string('attachment')->nullable();
            $table->boolean('status')->default(1);
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
        Schema::dropIfExists('help_tickets');
    }
}
