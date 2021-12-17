import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { httpInterceptorProviders } from './lib/interceptors';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import LayOutModules from './lay-out';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,           
  ],
  imports: [    
    AppRoutingModule,    
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // SharedModuleModule,     
    ...LayOutModules, 
    provideFirebaseApp(() => initializeApp(  environment.firebaseConfig )),
    provideAuth(() => getAuth()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
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
