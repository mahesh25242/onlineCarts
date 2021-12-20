import { Injectable, Optional } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, EMPTY, empty, from, Observable, of } from 'rxjs'
import { catchError, mergeMap, share, tap } from 'rxjs/operators';
import { trace } from '@angular/fire/compat/performance';
import { Messaging, getToken, onMessage,  } from '@angular/fire/messaging';
import { environment } from '@shop/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

currentMessage = new BehaviorSubject(null);

token$: Observable<any> = EMPTY;
message$: Observable<any> = EMPTY;
showRequest = false;


constructor(
  @Optional() messaging: Messaging, 
  ) {
    if (messaging) {
      this.token$ = from(
        navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' }).
          then(serviceWorkerRegistration =>
            getToken(messaging, {
              serviceWorkerRegistration,
              vapidKey: environment.vapidKey,
            })
          )).pipe(
            tap(token => console.log('FCM', {token})),
            share(),
          );
      this.message$ = new Observable(sub => onMessage(messaging, it => sub.next(it))).pipe(
        tap(token => console.log('FCM', {token})),
      );
    }
  }

  requestPermission() {
    Notification.requestPermission();
    // return this.angularFireMessaging.requestToken;
  }



  receiveMessage() {
    // return this.angularFireMessaging.messages.pipe(tap(msg=> this.currentMessage.next(msg)))
  }

  deleteToken() {
    // this.angularFireMessaging.getToken
    //   .pipe(tap((token:string) => {
    //     if(token)
    //       return this.angularFireMessaging.deleteToken(token)
    //     else of(null);
    //   }));
      // .subscribe(
      //   (token) => { console.log('Token deleted!'); },
      // );
  }
}
