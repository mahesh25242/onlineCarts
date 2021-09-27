import { TestBed } from '@angular/core/testing';

import { ReportAbuseService } from './report-abuse.service';

describe('ReportAbuseService', () => {
  let service: ReportAbuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportAbuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
