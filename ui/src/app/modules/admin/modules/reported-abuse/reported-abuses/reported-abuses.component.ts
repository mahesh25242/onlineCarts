import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  abuses$: Observable<ReportAbuseWithPagination>;
  private page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private reportAbuseService: ReportAbuseService,
    private modalService: NgbModal) { }

  view(ra: ReportAbuse){
    const modalRef = this.modalService.open(ViewAbuseComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.ra = ra;

  }

  loadPage(page){
    this.page$.next(page)

  }

  ngOnInit(): void {
    this.abuses$ = this.page$.asObservable().pipe(mergeMap(res => this.reportAbuseService.reportedAbuses(res)))
  }

}
