import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessagingService } from '../services';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AdminPushTokenInterceptor implements HttpInterceptor {

  constructor(private messagingService: MessagingService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('authUser')){


      return this.messagingService.token$.pipe(mergeMap(res=>{
        if(res){
          request = request.clone({
            setHeaders: {
              'Push-Token': res
            }
          });
        }
        return next.handle(request);
      }))

    }else{
      return next.handle(request);
    }




  }
}
