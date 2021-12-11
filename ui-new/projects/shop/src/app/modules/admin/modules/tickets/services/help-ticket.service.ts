import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, findIndex } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HelpTicket } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelpTicketService {
  private tickets$: BehaviorSubject<HelpTicket[] | null> = new BehaviorSubject<HelpTicket[] | null>(null);
  constructor(private http: HttpClient) { }


  get tickets(){
    return this.tickets$.asObservable();
  }
  types(){
    return this.http.get<any>("/shop/tickets/types")
  }


  ticket(){
    return this.http.get<any>("/shop/tickets/ticket").pipe(tap(res=>{
      this.tickets$.next(res);
    }))
  }


  saveTicket(postData: any = null){
    return this.http.post<any>("/shop/tickets/ticket/saveTicket", postData);
  }
}
