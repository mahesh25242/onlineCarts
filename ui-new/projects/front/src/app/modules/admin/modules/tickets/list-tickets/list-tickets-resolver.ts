import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from '../services';

@Injectable()
export class ListTicketsResolver implements Resolve<any> {

  constructor(
    private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.ticketService.tickets();
  }
}
