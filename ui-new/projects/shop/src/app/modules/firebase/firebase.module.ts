import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { FirebaseApps, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { FireMessagingComponent } from './fire-messaging/fire-messaging.component';
import { initializeAuth, browserPopupRedirectResolver, indexedDBLocalPersistence } from '@angular/fire/auth';
import {  environment }  from '../../../environments/environment';

@NgModule({
  declarations: [  
    FireMessagingComponent
  ],
  imports: [
    CommonModule,
    BrowserTransferStateModule     ,
    provideFirebaseApp(() => initializeApp(  environment.firebaseConfig )),    
    provideAuth(() => getAuth()),        
    // provideMessaging(() => getMessaging()),
  ],
  exports:[
    FireMessagingComponent
  ],
  providers:[
    FirebaseApps
  ]
})
export class FirebaseModule { }
