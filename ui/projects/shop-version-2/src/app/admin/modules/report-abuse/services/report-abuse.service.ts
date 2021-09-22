import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReportAbuseWithPagination, ReportAbuseType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportAbuseService {

  constructor(private http: HttpClient) { }



  abuseTypes(){
    return this.http.get<ReportAbuseType[]>('/shop/abuses/types');
  }

  myReports(parms: any = null){
    return this.http.get<ReportAbuseWithPagination>(`/shop/abuses?page=${parms.pageIndex+1}&pageSize=${parms.pageSize}`);
  }

  save(postData: any = null){
    return this.http.post<any>('/shop/abuses/report', postData);
  }

}
