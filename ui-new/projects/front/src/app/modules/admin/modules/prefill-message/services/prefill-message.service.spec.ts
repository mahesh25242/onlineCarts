import { TestBed } from '@angular/core/testing';

import { PrefillMessageService } from './prefill-message.service';

describe('PrefillMessageService', () => {
  let service: PrefillMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefillMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
