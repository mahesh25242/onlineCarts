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

    $router->group(['prefix' => 'bot'], function () use ($router) {
        $router->post('/','BotManController@index');
    });

    $router->get('countries','CountryController@countries');
    $router->get('states','StateController@states');
    $router->get('cities','CityController@cities');
    $router->get('categories','ShopsCategoryController@activeCategories');
    $router->post('sentContact','ContactUsController@sentContact');
    $router->post('register','ShopsController@register');
    $router->post('socialLogin','UsersController@socialLogin');
    $router->post('demoSignIn','UsersController@demoSignIn');
    $router->post('signIn','UsersController@signIn');
    $router->post('refreshToken','UsersController@refreshToken');
    $router->get('/shopName/{name}','ShopsController@byShopName');
    $router->get('/ourClients','ShopsController@ourClients');
    $router->get('/footerData','SettingController@footerData');

    $router->group(['prefix' => 'packages'], function () use ($router) {
        $router->get('/','PackageController@packages');
        $router->group(['prefix' => '{id}', 'middleware' => 'admin'], function () use ($router) {
            $router->post('/save','PackageController@save');
            $router->post('/assignToShop','PackageController@assignToShop');
        });
    });

    /* Billing apps */
    $router->group(['prefix' => 'shop', 'middleware' =>  'AppMiddleware'], function () use ($router) {
        $router->get('/','ShopsController@shopDetails');
        $router->group(['prefix' => 'banner', 'middleware' => 'activeShopMiddleWare'], function () use ($router) {
            $router->get('/','ShopBannerController@banners');
            $router->post('/save','ShopBannerController@save');
        });

        $router->group(['prefix' => 'points'], function () use ($router) {
            $router->get('/','ShopPointController@points');
        });


        $router->group(['prefix' => 'abuses'], function () use ($router) {
            $router->get('/types','ReportAbuseController@types');
            $router->post('/report','ReportAbuseController@save');
        });

        $router->group(['prefix' => 'cms', 'middleware' => 'activeShopMiddleWare'], function () use ($router) {
            $router->get('/','CMSController@pages');
        });

        $router->get('/manifest/{shopKey}','ShopsController@webmanifest');
        $router->get('/adminHomeStat','ShopsController@adminHomeStat');

        $router->group(['middleware' => 'activeShopMiddleWare'], function () use ($router) {

            $router->post('createOrder','ShopOrderController@createOrder');
            $router->post('showOrderDetail','ShopOrderController@showOrderDetail');
        });

        $router->group(['prefix' => 'product', 'middleware' => 'activeShopMiddleWare'], function () use ($router) {
            $router->get('showCategories','ShopProductCategoryController@showCategories');
            $router->post('showProducts','ShopProductController@showProducts');
            $router->get('showProductsFilters','ShopProductController@showProductsFilters');
            $router->post('showProductDetails','ShopProductController@showProductDetails');
            $router->get('showProduct/{id}','ShopProductController@showProduct');
            $router->group(['prefix' => 'tags'], function () use ($router) {
                $router->get('/','ShopProductTagController@index');
                $router->post('/save','ShopProductTagController@store');
                $router->group(['prefix' => 'varient'], function () use ($router) {
                    $router->get('/','ShopProductVarientTagController@index');
                    $router->post('/save','ShopProductVarientTagController@store');
                });
            });


        });
    });



    $router->group(['middleware' => 'auth'], function () use ($router) {



        $router->group(['middleware' =>  'adminAndShop'], function () use ($router) {
            $router->get('authUser','UsersController@authUser');
            $router->post('setUserLogin','UsersController@setUserLogin');
            $router->get('signOut','UsersController@signOut');

            $router->group(['prefix' => 'idProof'], function () use ($router) {
                $router->get('types','IdProofController@types');
                $router->get('checkExists','IdProofController@checkExists');
                $router->post('upload',[
                    'middleware' => 'demoShopMiddleWare',
                    'uses' => 'IdProofController@upload'
                ]);
            });


            $router->group(['middleware' => 'activeShopMiddleWare'], function () use ($router) {
                $router->post('updateAvatar','UsersController@updateAvatar');
                $router->post('updateProfile','UsersController@updateProfile');
            });


            $router->group(['prefix' => 'shop'], function () use ($router) {
                $router->get('/paymentData','SettingController@paymentData');
                $router->get('/getMyPayments', 'ShopsController@getMyPayments');
                $router->group(['prefix' => 'abuses'], function () use ($router) {
                    $router->get('/','ReportAbuseController@shopAbuses');
                });

                $router->group(['prefix' => 'messages'], function () use ($router) {
                    $router->get('/latest','ShopMessageController@latestMsgs');
                });

                $router->group(['prefix' => 'points'], function () use ($router) {
                    $router->get('/','ShopPointController@points');
                    $router->group(['middleware' => 'activeShopMiddleWare'], function () use ($router) {
                        $router->post('/redeemPoints', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopPointController@redeemPoints'
                        ]);
                    });
                });

                $router->group(['middleware' => 'activeShopMiddleWare'], function () use ($router) {
                    $router->post('/store', [
                        'middleware' => 'demoShopMiddleWare',
                        'uses' => 'ShopsController@updateDetails'
                    ]);
                    $router->post('/changelogoFav','ShopsController@setFaviconOrLogo');
                    $router->post('/orders','ShopOrderController@orders');
                    $router->post('/orders/changeStatus', [
                        'middleware' => 'demoShopMiddleWare',
                        'uses' => 'ShopOrderController@changeStatus'
                    ]);
                    $router->post('/generateSite','ShopsController@generateSite');
                    $router->post('/mobile_verified',[
                        'middleware' => 'demoShopMiddleWare',
                        'uses' => 'ShopsController@mobileVerified'
                    ]);

                    $router->group(['prefix' => 'deliveries'], function () use ($router) {
                        $router->post('/slotToo','ShopDeliveryController@deliveries');
                        $router->post('delete', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopDeliveryController@delete'
                        ]);
                        $router->post('store', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopDeliveryController@store'
                        ]);
                        $router->group(['prefix' => 'slot'], function () use ($router) {
                            $router->post('delete', [
                                'middleware' => 'demoShopMiddleWare',
                                'uses' => 'ShopDeliverySlotController@delete'
                            ]);
                            $router->post('store', [
                                'middleware' => 'demoShopMiddleWare',
                                'uses' => 'ShopDeliverySlotController@store'
                            ]);
                        });
                    });
                    $router->group(['prefix' => 'themes'], function () use ($router) {
                        $router->get('/','ThemesController@index');
                        $router->post('/save','ThemesController@store');
                    });


                    $router->group(['prefix' => 'products'], function () use ($router) {
                        $router->post('/','ShopProductController@products');
                        $router->post('store',[
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopProductController@store'
                        ]);
                        $router->post('delete',[
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopProductController@delete'
                        ]);
                        $router->post('changeStatus', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'ShopProductController@changeStatus'
                        ]);

                        $router->group(['prefix' => 'categories'], function () use ($router) {
                            $router->post('/','ShopProductCategoryController@categories');
                            $router->post('store',
                            [
                                'middleware' => 'demoShopMiddleWare',
                                'uses' => 'ShopProductCategoryController@store'
                            ]);
                            $router->post('delete',
                            [
                                'middleware' => 'demoShopMiddleWare',
                                'uses' => 'ShopProductCategoryController@delete'
                            ]);
                            $router->post('changeStatus',
                            [
                                'middleware' => 'demoShopMiddleWare',
                                'uses' => 'ShopProductCategoryController@changeStatus'
                            ]);
                        });

                    });

                    $router->group(['prefix' => 'cms'], function () use ($router) {
                        $router->post('/store', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'CMSController@store'
                        ]);
                    });
                });

                $router->group(['prefix' => 'tickets'], function () use ($router) {
                    $router->get('/types','HelpTicketController@types');
                    $router->group(['prefix' => 'ticket'], function () use ($router) {
                        $router->get('/','HelpTicketController@tickets');
                        $router->post('/saveTicket', [
                            'middleware' => 'demoShopMiddleWare',
                            'uses' => 'HelpTicketController@saveTicket'
                        ]);
                    });
                });
            });
        });



        $router->group(['prefix' => 'admin',  'middleware' =>  'admin'], function () use ($router) {

            $router->post('createAdmin','UsersController@createAdmin');
            $router->get('abuses','ReportAbuseController@abuses');

            $router->group(['prefix' => 'pointCoupons'], function () use ($router) {
                $router->get('/','PointCouponController@coupons');
                $router->group(['prefix' => '{id}'], function () use ($router) {
                    $router->post('save','PointCouponController@save');
                    $router->post('delete','PointCouponController@delete');
                    $router->post('report','PointCouponController@report');
                });
            });

            $router->group(['prefix' => 'userIdProof'], function () use ($router) {
                $router->get('/','IdProofController@userIdProofs');
                $router->post('changeStatus','IdProofController@changeStatus');
            });

            $router->group(['prefix' => 'shops'], function () use ($router) {
                $router->post('/','ShopsController@shops');
                $router->post('/trash','ShopsController@trashShops');
                $router->get('/shop/{id}','ShopsController@getAShop');
                $router->post('store','ShopsController@store');
                $router->post('delete/{id}','ShopsController@delete');
                $router->post('changeStatus','ShopsController@changeStatus');
                $router->post('/generateSite','ShopsController@generateSite');
                $router->post('/downloadSite','ShopsController@downloadSite');
                $router->group(['prefix' => 'categories'], function () use ($router) {
                    $router->post('/','ShopsCategoryController@categories');
                    $router->post('store','ShopsCategoryController@store');
                    $router->post('delete/{id}','ShopsCategoryController@delete');
                });

            });

            $router->group(['prefix' => 'tickets'], function () use ($router) {
                $router->post('/','HelpTicketController@allTickets');
                $router->group(['prefix' => '{id}'], function () use ($router) {
                    $router->get('/','HelpTicketController@replies');
                    $router->post('/reply','HelpTicketController@reply');
                });


            });

            $router->group(['prefix' => 'settings'], function () use ($router) {
                $router->get('/','SettingController@settings');
                $router->group(['prefix' => '{id}'], function () use ($router) {
                    $router->post('/save','SettingController@save');
                });
            });

            $router->group(['prefix' => 'preefillMessage'], function () use ($router) {
                $router->get('/','PrefillMessageController@messages');
                $router->group(['prefix' => '{id}'], function () use ($router) {
                    $router->post('/save','PrefillMessageController@save');
                });
            });


        });



    });


});



