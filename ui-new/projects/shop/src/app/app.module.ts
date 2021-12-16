import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import * as Hammer from 'hammerjs';
import { httpInterceptorProviders } from './lib/interceptors';

import { ReportAbuseModule, TagModule } from './modules';

import layoutComponents from  './lay-out';
import pageComponents from './pages';
import { LoadInitialConfigaration } from './lib/providers';
import { ShopSharedModule } from './modules/admin/modules/shared-shop/shared-shop.module';

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
    provideFirebaseApp(() => initializeApp(  environment.firebaseConfig )),
    provideAuth(() => getAuth()),
    
    ReportAbuseModule,
    TagModule
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
