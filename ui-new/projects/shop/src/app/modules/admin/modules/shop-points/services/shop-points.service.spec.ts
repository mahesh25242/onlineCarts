import { TestBed } from '@angular/core/testing';

import { ShopPointsService } from './shop-points.service';

describe('ShopPointsService', () => {
  let service: ShopPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
