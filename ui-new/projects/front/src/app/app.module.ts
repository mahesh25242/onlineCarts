import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { httpInterceptorProviders } from './lib/interceptors';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { ReCaptchaV3Provider, initializeAppCheck} from 'firebase/app-check';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import LayOutComponents from './lay-out';
import PageComponents from './pages/index';
import CommonComponents from './components';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAppCheck } from '@angular/fire/app-check';
import { getApp } from '@angular/fire/app';
@NgModule({
  declarations: [
    AppComponent,
    ...CommonComponents,
    ...LayOutComponents,    
    ...PageComponents,
  ],
  imports: [    
    AppRoutingModule,    
    BrowserModule,
    BrowserAnimationsModule,
    
    SharedModuleModule,
    IvyCarouselModule,
    provideFirebaseApp(() => initializeApp(  environment.firebaseConfig )),
    provideAuth(() => getAuth()),
    // provideAppCheck(() => {
    //   const provider = new ReCaptchaV3Provider(environment.recaptchaKey);
    //   console.log(provider)
    //   return initializeAppCheck(getApp(), {
    //     provider,
    //     isTokenAutoRefreshEnabled: true,
    //   });
    // })
    
  ],
  providers: [ 
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
