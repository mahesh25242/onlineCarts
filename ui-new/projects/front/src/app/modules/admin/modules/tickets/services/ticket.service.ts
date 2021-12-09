import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { findIndex, tap } from 'rxjs/operators';
import {  HelpTicket, HelpTicketWithPagination  } from '../../../../../lib/interfaces';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private allTickets$: BehaviorSubject<HelpTicketWithPagination | null> = new BehaviorSubject<HelpTicketWithPagination | null>(null);

  constructor(private http: HttpClient) { }

  get allTickets(){
    return this.allTickets$.asObservable();
  }
  tickets(postData:any = null, page: number = 1){
    return this.http.post<any>(`/admin/tickets?page=${page}`, postData).pipe(tap(res=>{
      this.allTickets$.next(res);
    }));
  }

  replies(ticketId: number = 0){
    return this.http.get<any>(`/admin/tickets/${ticketId}`).pipe(tap(res=>{
      const tickets:HelpTicketWithPagination | null = this.allTickets$.getValue();
      let tkt = find(tickets?.data, {id: ticketId});

      tkt = {...tkt, ...{all_children_replies: res} }
            
      this.allTickets$.next(tickets);
    }))
  }

  sendReply(postData: any = null){
    return this.http.post<any>(`/admin/tickets/${postData.id}/reply`, postData);
  }
  changeStatus(postData:any = null){
    return this.http.post<any>(`/shop/orders/changeStatus`, postData);
  }


}

