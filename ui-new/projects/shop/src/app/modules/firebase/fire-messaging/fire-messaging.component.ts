import { Component, OnInit, Optional } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../../../environments/environment';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Component({
  selector: 'fire-fire-messaging',
  templateUrl: './fire-messaging.component.html',
  styleUrls: ['./fire-messaging.component.scss']
})
export class FireMessagingComponent implements OnInit {
  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;
  showRequest = false;

  constructor(@Optional() messaging: Messaging) {
    
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
            catchError(err => {
              console.log(err)
              return throwError(() => err)
            })
          );
      this.message$ = new Observable(sub => onMessage(messaging, it => sub.next(it))).pipe(
        tap(it => console.log('FCM', it)),
      );
    }
  }

  ngOnInit(): void {
  }

  request() {
    Notification.requestPermission();
  }

}
