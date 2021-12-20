import { Component, OnInit, Optional } from '@angular/core';
import { EMPTY, from, Observable, share, Subscription, tap } from 'rxjs';
import { Messaging, getToken, onMessage,  } from '@angular/fire/messaging';
import { environment } from '@shop/environments/environment';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, authState, GoogleAuthProvider, signInAnonymously, 
  signInWithPopup, signOut, User } from '@angular/fire/auth';

import {
  Auth as gAuth,
  user,
  User as gUser,
  getAuth
} from '@angular/fire/auth';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;
  showRequest = false;



  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;
  showLoginButton = true;
  showLogoutButton = false;

  constructor(
    @Optional() messaging: Messaging, 
  @Optional() private auth: Auth
  ) {
    console.log('messaging', messaging);
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


    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void {
    // const auth = getAuth().currentUser;
  }

  request() {    
    Notification.requestPermission();
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
