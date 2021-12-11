import { TestBed } from '@angular/core/testing';

import { HelpTicketService } from './help-ticket.service';

describe('HelpTicketService', () => {
  let service: HelpTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
