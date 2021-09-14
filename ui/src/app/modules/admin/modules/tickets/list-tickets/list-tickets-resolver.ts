import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicketService } from '../services';

@Injectable()
export class ListTicketsResolver implements Resolve<any> {

  constructor(
    private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.ticketService.tickets();
  }
}
