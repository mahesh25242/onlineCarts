import { TestBed } from '@angular/core/testing';

import { AdminPushTokenInterceptor } from './admin-push-token.interceptor';

describe('AdminPushTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminPushTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminPushTokenInterceptor = TestBed.inject(AdminPushTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
