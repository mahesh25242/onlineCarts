import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, empty, Observable, of } from 'rxjs'
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { trace } from '@angular/fire/compat/performance';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

currentMessage = new BehaviorSubject(null);

token$: Observable<any>;
message$: Observable<any>;
showRequest = false;


constructor(
  public readonly angularFireMessaging: AngularFireMessaging,  
  ) {
    angularFireMessaging.getToken.subscribe(console.log)
    this.message$ = angularFireMessaging.messages;
    this.token$ = angularFireMessaging.tokenChanges.pipe(
      trace('token'),
      tap(token => this.showRequest = !token)
    );
  }

  requestPermission() {
    return this.angularFireMessaging.requestToken;
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
