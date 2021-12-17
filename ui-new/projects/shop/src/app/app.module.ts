import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Hammer from 'hammerjs';
import { httpInterceptorProviders } from './lib/interceptors';

import { ReportAbuseModule, TagModule, FirebaseModule } from './modules';

import layoutComponents from  './lay-out';
import pageComponents from './pages';
import { LoadInitialConfigaration } from './lib/providers';
import { ShopSharedModule } from './modules/admin/modules/shared-shop/shared-shop.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    'pinch': { enable: false },
    'rotate': { enable: false },
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL, threshold: 5  },
    //threshold: 5
  };
}




@NgModule({
  declarations: [
    AppComponent,
    ...layoutComponents,
    ...pageComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    NgxQRCodeModule,
    ShopSharedModule,
    
    SharedModuleModule,
    IvyCarouselModule,
    
    
    ReportAbuseModule,
    TagModule,
    FirebaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    LoadInitialConfigaration,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
