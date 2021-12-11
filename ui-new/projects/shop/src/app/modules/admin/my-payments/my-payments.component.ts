import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PackageService } from '../../../lib/services';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {
  shopRenew$!: Observable<any>;

  PageEvent$: BehaviorSubject<PageEvent | null> = new BehaviorSubject<PageEvent | null>(null);

  displayedColumns: string[] = ['no',  'name', 'dated',  'start', 'end', 'amount'];

  constructor(private packageService: PackageService) { }

  goto(pageEvent: PageEvent){
    this.PageEvent$.next(pageEvent);
  }

  ngOnInit(): void {

    this.shopRenew$ = this.PageEvent$.asObservable().pipe(mergeMap(pageEvent =>{

      const parms = {
        pageIndex: pageEvent?.pageIndex ?? 0,
        pageSize: pageEvent?.pageSize ?? 50,
      }

      return this.packageService.getMyPayments(parms)
    }))
  }

}
