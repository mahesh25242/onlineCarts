import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Hammer from 'hammerjs';
import { httpInterceptorProviders } from '@shop/app/lib/interceptors';


import layoutComponents from  './lay-out';
import { SearchBarModule } from './pages/components/search-bar/search-bar.module';

import { LoadInitialConfigaration } from '@shop/app/lib/providers';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@shop/environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,        
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatBadgeModule,
    MatSnackBarModule,     
    SearchBarModule,
    MatButtonModule,
    ScrollingModule,
    
    provideFirebaseApp(() => initializeApp(  environment.firebaseConfig )),
    provideAuth(() => getAuth()),
    provideMessaging(() => getMessaging()),
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
