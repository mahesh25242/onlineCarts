import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ReportAbuse, ReportAbuseWithPagination } from '../interfaces';
import { ReportAbuseService } from '../services';
import { ViewAbuseComponent } from './view-abuse/view-abuse.component';

@Component({
  selector: 'app-reported-abuses',
  templateUrl: './reported-abuses.component.html',
  styleUrls: ['./reported-abuses.component.scss']
})
export class ReportedAbusesComponent implements OnInit {
  abuses$!: Observable<ReportAbuseWithPagination>;
  private page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  displayedColumns: string[] = ['id', 'type_name', 'abuse', 'shop', 'product',  'created_at'];

  constructor(private reportAbuseService: ReportAbuseService,
    public dialog: MatDialog) { }

  view(ra: ReportAbuse){

    const dialogRef = this.dialog.open(ViewAbuseComponent,{
      data: ra
    });

  

  }

  goto(page: PageEvent){
    this.page$.next(page.pageIndex)

  }

  ngOnInit(): void {
    this.abuses$ = this.page$.asObservable().pipe(mergeMap(res => this.reportAbuseService.reportedAbuses(res)))
  }

}
