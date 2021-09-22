import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {  ReportAbuseWithPagination } from '../interfaces';
import { ReportAbuseService } from '../services';
@Component({
  selector: 'app-my-reported-abuses',
  templateUrl: './my-reported-abuses.component.html',
  styleUrls: ['./my-reported-abuses.component.scss']
})
export class MyReportedAbusesComponent implements OnInit {

  abuses$:Observable<ReportAbuseWithPagination>;
  PageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>(null);

  displayedColumns: string[] = ['no',  'name', 'type', 'product', 'dated', 'comment'];


  constructor(private reportAbuseService: ReportAbuseService) { }

  goto(pageEvent: PageEvent){
    this.PageEvent$.next(pageEvent);
  }

  ngOnInit(): void {
    this.abuses$ = this.PageEvent$.asObservable().pipe(mergeMap(pageEvent =>{

      const parms = {
        pageIndex: pageEvent?.pageIndex ?? 0,
        pageSize: pageEvent?.pageSize ?? 50,
      }

      return this.reportAbuseService.myReports(parms);
    }))
  }

}
