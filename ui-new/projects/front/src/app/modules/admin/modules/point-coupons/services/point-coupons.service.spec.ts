import { TestBed } from '@angular/core/testing';

import { PointCouponService } from './point-coupons.service';

describe('PointCouponService', () => {
  let service: PointCouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointCouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
