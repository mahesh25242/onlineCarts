<?php

namespace App\Console\Commands;

use Helpers;
use Illuminate\Console\Command;

class ShopExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ShopExpired:expired-shop';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cron for expiring shop';

    public static $process_busy = false;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){
        if (self::$process_busy == false) {
            //error_log("shop expiring exixuted!", 1);
            self::$process_busy = true;
            $emailJob = (new \App\Jobs\ShopExpiredEmailJob(null))->delay(Carbon::now()->addSeconds(2));
            dispatch($emailJob);
            self::$process_busy = false;

            return true;
        } else {
            // if ($debug_mode) {
            //     error_log("Process busy!", 0);
            // }
            return false;
        }


    }
}
