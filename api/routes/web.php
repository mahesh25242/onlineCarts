<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('/key', function() {
    return \Illuminate\Support\Str::random(32);
});

$router->get('test','UsersController@test');

//$router->get('/{sitemap}','SiteMapController@index');

$router->group(['prefix' => 'v1'], function () use ($router) {

    $router->get('countries','CountryController@countries');
    $router->get('states','StateController@states');
    $router->get('cities','CityController@cities');
    $router->get('categories','ShopsCategoryController@activeCategories');
    $router->post('sentContact','ContactUsController@sentContact');
    $router->post('register','ShopsController@register');
    $router->post('socialLogin','UsersController@socialLogin');
    $router->post('demoSignIn','UsersController@demoSignIn');

    /* Billing apps */
    $router->group(['prefix' => 'shop', 'middleware' =>  'AppMiddleware'], function () use ($router) {
        $router->get('/','ShopsController@shopDetails');
        $router->get('/adminHomeStat','ShopsController@adminHomeStat');
        $router->post('createOrder','ShopOrderController@createOrder');
        $router->post('showOrderDetail','ShopOrderController@showOrderDetail');
        $router->group(['prefix' => 'product'], function () use ($router) {
            $router->get('showCategories','ShopProductCategoryController@showCategories');
            $router->post('showProducts','ShopProductController@showProducts');
            $router->post('showProductDetails','ShopProductController@showProductDetails');
        });
    });

    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->group(['middleware' =>  'adminAndShop'], function () use ($router) {
            $router->get('authUser','UsersController@authUser');
            $router->post('setUserLogin','UsersController@setUserLogin');
            $router->get('signOut','UsersController@signOut');
            $router->post('updateAvatar','UsersController@updateAvatar');
            $router->post('updateProfile','UsersController@updateProfile');

            $router->group(['prefix' => 'shop'], function () use ($router) {
                $router->post('/store','ShopsController@updateDetails');
                $router->post('/orders','ShopOrderController@orders');
                $router->post('/orders/changeStatus','ShopOrderController@changeStatus');
                $router->group(['prefix' => 'deliveries'], function () use ($router) {
                    $router->post('/','ShopDeliveryController@deliveries');
                    $router->post('delete','ShopDeliveryController@delete');
                    $router->post('store','ShopDeliveryController@store');
                });
                $router->group(['prefix' => 'themes'], function () use ($router) {
                    $router->get('/','ThemesController@index');
                    $router->post('/save','ThemesController@store');
                });


                $router->group(['prefix' => 'products'], function () use ($router) {
                    $router->post('/','ShopProductController@products');
                    $router->post('store','ShopProductController@store');
                    $router->post('delete','ShopProductController@delete');
                    $router->post('changeStatus','ShopProductController@changeStatus');
                    $router->group(['prefix' => 'categories'], function () use ($router) {
                        $router->post('/','ShopProductCategoryController@categories');
                        $router->post('store','ShopProductCategoryController@store');
                        $router->post('delete','ShopProductCategoryController@delete');
                        $router->post('changeStatus','ShopProductCategoryController@changeStatus');
                    });

                });

            });
        });



        $router->group(['prefix' => 'admin',  'middleware' =>  'admin'], function () use ($router) {

            $router->post('createAdmin','UsersController@createAdmin');

            $router->group(['prefix' => 'shops'], function () use ($router) {
                $router->post('/','ShopsController@shops');
                $router->post('/trash','ShopsController@trashShops');
                $router->get('/shop/{id}','ShopsController@getAShop');
                $router->post('store','ShopsController@store');
                $router->post('delete/{id}','ShopsController@delete');
                $router->post('/generateSite','ShopsController@generateSite');
                $router->post('/downloadSite','ShopsController@downloadSite');
                $router->group(['prefix' => 'categories'], function () use ($router) {
                    $router->post('/','ShopsCategoryController@categories');
                    $router->post('store','ShopsCategoryController@store');
                    $router->post('delete/{id}','ShopsCategoryController@delete');
                });

            });

        });



    });


});



