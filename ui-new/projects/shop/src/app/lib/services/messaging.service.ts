import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, empty, of } from 'rxjs'
import { catchError, mergeMap, tap } from 'rxjs/operators';


@Injectable()
export class MessagingService {

currentMessage = new BehaviorSubject(null);

constructor(
  private angularFireMessaging: AngularFireMessaging,  
  ) {

     this.angularFireMessaging.messages.subscribe(
     (msgings: any) => {
        if(msgings.onMessage)
          msgings.onMessage = msgings.onMessage.bind(msgings);
        if(msgings.onTokenRefresh)
          msgings.onTokenRefresh=msgings.onTokenRefresh.bind(msgings);
    })
  }

  requestPermission() {
    return this.angularFireMessaging.requestToken;
  }

  getToken(){
    return this.angularFireMessaging.getToken.pipe(catchError(err=>{
      return of(null);
    }));
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
