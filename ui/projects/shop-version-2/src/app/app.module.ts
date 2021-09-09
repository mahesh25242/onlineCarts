import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable, NgModule, isDevMode, APP_INITIALIZER, FactoryProvider } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService,
  DEBUG_MODE as ANALYTICS_DEBUG_MODE, } from '@angular/fire/analytics';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';

import { httpInterceptorProviders } from './lib/interceptor'

import { SharedModuleModule } from './lib/shared-module/shared-module.module';
import { TagModule } from './admin/modules';
import * as Hammer from 'hammerjs';
import { LOCALE_ID} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSideNavListComponent } from './admin-header/admin-side-nav-list/admin-side-nav-list.component';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MobileContactComponent } from './contact-us/mobile-contact/mobile-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { ProductResolver } from './components/product/product-resolver';
import { CartComponent } from './components/cart/cart.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { SideNavListComponent } from './header/side-nav-list/side-nav-list.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolver } from './product-details/product-details-resolver';
import { EditMessageComponent } from './cart-details/edit-message/edit-message.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchFilterComponent } from './search-result/search-filter/search-filter.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { OrderFormComponent } from './cart-details/order-form/order-form.component';
import { OrderTermsComponent } from './cart-details/order-terms/order-terms.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from "@angular/fire";
import { MessagingService } from './lib/services';
import { OrderDeatilComponent } from './order-deatil/order-deatil.component';
import { OrderDeatilResolver } from './order-deatil/order-deatil-resolver';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { LayoutComponent } from './layout/layout.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DeliveryLocationComponent } from './cart-details/delivery-loaction/delivery-loaction.component';

import { ShopService } from 'src/app/lib/services/shop.service';

import { registerLocaleData } from '@angular/common';

import localeIn from '@angular/common/locales/en-IN';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
registerLocaleData(localeIn);

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}
const baseHref = document.getElementsByTagName('base')

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: "onlinecarts.in", //(baseHref.length > 0 ) ?  `${window.location.host}${baseHref[0].getAttribute("href")}` : window.location.host // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  position:'bottom-left',
  type: 'opt-out'
};

function initializeAppFactory(shopService: ShopService) {

  return () => shopService.shopDetail1().pipe(tap(res=>alert("as")))
 }


 const loadConfigProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [ShopService],
  multi: true
};




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdminHeaderComponent,
    AdminSideNavListComponent,
    FooterComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    ProductComponent,
    CartComponent,
    CartDetailsComponent,
    SideNavListComponent,
    AddToCartComponent,
    ProductDetailsComponent,
    EditMessageComponent,
    SearchComponent,
    SearchResultComponent,
    OrderFormComponent,
    OrderTermsComponent,
    OrderDeatilComponent,
    ProductItemComponent,
    LayoutComponent,
    CarouselComponent,
    DeliveryLocationComponent,
    MobileContactComponent,
    SearchFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    HammerModule,

    MatToolbarModule,

    HttpClientModule,
    HttpClientXsrfModule.disable(),
    MatCarouselModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgxSliderModule,
    TagModule,
    NgxQRCodeModule,
    AngularFirePerformanceModule
  ],
  providers: [
    loadConfigProvider,
    httpInterceptorProviders,
    ScreenTrackingService,
    ProductResolver,
    ProductDetailsResolver,
    OrderDeatilResolver,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    MessagingService,
    {
      provide: LOCALE_ID,
      useValue: 'en-IN' // 'de' for Germany, 'fr' for France ...
     },
     UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    {
      provide: ANALYTICS_DEBUG_MODE,
      useFactory: () => isDevMode()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
