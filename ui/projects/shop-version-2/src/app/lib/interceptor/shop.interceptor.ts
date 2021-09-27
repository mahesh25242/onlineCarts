import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from '../services';
import Notiflix from "notiflix";

@Injectable()
export class ShopInterceptor implements HttpInterceptor {

  constructor(private generalService :GeneralService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 402 ) {
          let msg = {
            subject: '',
            message: ''
          }
          if(error.error?.prefill_message){
            msg ={...msg, ...error.error?.prefill_message}
          }else{
            msg = { subject: 'Disabled', message: 'Shop was disabled please contact admin'}
          }
          this.generalService.shopDisabled$.next(msg);
        }

        return throwError(error);
      }));
  }
}
