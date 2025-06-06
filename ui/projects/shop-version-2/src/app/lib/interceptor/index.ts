/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { ApiUrlInterceptor } from './api-url.interceptor';
import { ShopInterceptor } from './shop.interceptor';
import { AdminPushTokenInterceptor } from './admin-push-token.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ShopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AdminPushTokenInterceptor, multi: true },
];


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
