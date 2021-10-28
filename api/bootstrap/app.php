<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

// $app->withFacades();

$app->withEloquent();


$app->withFacades(true, [
    'Intervention\Image\Facades\Image' => 'Image',
    'Illuminate\Support\Facades\Mail' => 'Mail',
]);

class_alias(\LaravelFCM\Facades\FCM::class, 'FCM');
class_alias(\LaravelFCM\Facades\FCMGroup::class, 'FCMGroup');


/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

use Dusterio\LumenPassport\LumenPassport;
LumenPassport::allowMultipleTokens();


$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton('filesystem', function ($app) {
    return $app->loadComponent('filesystems', 'Illuminate\Filesystem\FilesystemServiceProvider', 'filesystem');
});


/*
|--------------------------------------------------------------------------
| Register Config Files
|--------------------------------------------------------------------------
|
| Now we will register the "app" configuration file. If the file exists in
| your configuration directory it will be loaded; otherwise, we'll load
| the default version. You may register other files below as needed.
|
*/

$app->configure('app');
$app->configure('auth');
$app->configure('mail');
$app->configure('filesystems');
$app->configure('dompdf');

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

// $app->middleware([
//     App\Http\Middleware\ExampleMiddleware::class
// ]);

// $app->routeMiddleware([
//     'auth' => App\Http\Middleware\Authenticate::class,
// ]);

$app->middleware([
    App\Http\Middleware\CorsMiddleware::class,
    App\Http\Middleware\ShopKeyToShopIdMiddleWare::class,
 ]);

$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
    'maintanance' => App\Http\Middleware\SiteMaintenanceMiddleware::class,
    'admin' => \App\Http\Middleware\AdminAuthenticate::class,
    'shop' => \App\Http\Middleware\ShopAuthenticate::class,
    'adminAndShop' => \App\Http\Middleware\AdminAndShopAuthenticate::class,
    'AppMiddleware' => \App\Http\Middleware\AppMiddleware::class,
    'activeShopMiddleWare' => \App\Http\Middleware\ActiveShopMiddleWare::class,
    'demoShopMiddleWare' => \App\Http\Middleware\DemoShopMiddleWare::class,
    'auth' => App\Http\Middleware\Authenticate::class,
    'client' => \Laravel\Passport\Http\Middleware\CheckClientCredentials::class,
]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

// $app->register(App\Providers\AppServiceProvider::class);
// $app->register(App\Providers\AuthServiceProvider::class);
// $app->register(App\Providers\EventServiceProvider::class);

$app->register(App\Providers\AppServiceProvider::class);
$app->register(App\Providers\AuthServiceProvider::class);
$app->register(App\Providers\EventServiceProvider::class);
$app->register(Laravel\Passport\PassportServiceProvider::class);
$app->register(Dusterio\LumenPassport\PassportServiceProvider::class);


$app->register(Intervention\Image\ImageServiceProvider::class);
$app->register(Illuminate\Mail\MailServiceProvider::class);
$app->register(\Barryvdh\DomPDF\ServiceProvider::class);



$app->register(LaravelFCM\FCMServiceProvider::class);

$app->register(Kreait\Laravel\Firebase\ServiceProvider::class);


/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/



\Dusterio\LumenPassport\LumenPassport::routes($app, ['prefix' => 'v1/oauth']);


$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
