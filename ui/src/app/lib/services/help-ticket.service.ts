import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, share, tap } from 'rxjs/operators';
import { HelpTicket, Shop, ShopDelivery, ShopDeliverySlot } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelpTicketService {
  private tickets$: BehaviorSubject<HelpTicket[]> = new BehaviorSubject<HelpTicket[]>(null);
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
