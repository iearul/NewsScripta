<?php

namespace App\Console\Commands;

use App\Http\Controllers\NewsController;
use App\Models\News;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use jcobhams\NewsApi\NewsApi;
use SimplePie\SimplePie;

class NewsCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        NewsController::storeNewsFromAPI();
    }
}
