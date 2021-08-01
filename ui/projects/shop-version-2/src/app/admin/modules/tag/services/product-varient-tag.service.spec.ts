import { TestBed } from '@angular/core/testing';

import { ProductVarientTagService } from './product-varient-tag.service';

describe('ProductVarientTagService', () => {
  let service: ProductVarientTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVarientTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
