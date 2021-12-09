import { TestBed } from '@angular/core/testing';

import { UserIdProofService } from './user-id-proof.service';

describe('UserIdProofService', () => {
  let service: UserIdProofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdProofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
