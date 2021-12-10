import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PointCouponsWithPagination, PointCoupon } from '../interfaces';
import { PointCouponService } from '../services';
import { CreateNewComponent } from './create-new/create-new.component';


@Component({
  selector: 'app-point-coupons',
  templateUrl: './point-coupons.component.html',
  styleUrls: ['./point-coupons.component.scss']
})
export class PointCouponsComponent implements OnInit {
  pointCoupons$!: Observable<PointCouponsWithPagination>;
  private recall$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  displayedColumns: string[] = ['no', 'code', 'no_use', 'point', 'shop', 'start_date', 'end_date', 'options'];


  
  constructor(private pointCouponService: PointCouponService,
    public dialog: MatDialog,
    @Inject('NotiflixService') public notiflix: any,
    private _snackBar: MatSnackBar) { }

  usedReport(pc: PointCoupon | null = null){

  }
  delete(pc: PointCoupon | null = null){
    this.notiflix.confirm( 'delete?', `Do you want to delete ${pc?.code}`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard();
      this.pointCouponService.delete(pc).subscribe({
        next: ()=>{
          this._snackBar.open(`${pc?.code} Successfully deleted `, 'Close');          
        },
        complete: ()=>{
          this.recall$.next(true);             
        }
      }).add(()=>{
        this.notiflix.loading.Remove();       
      });
    });
  }
  createOrEdit(pc: PointCoupon | null = null){
    const dialogRef = this.dialog.open(CreateNewComponent,{
      data: pc
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recall$.next(true);
    });


    
    // modalRef.result.then((result) => {
    //   if(result){
    //     
    //   }
    // }, (reason) => {

    // })
  }


  goto(page: PageEvent){    

  }
  
  ngOnInit(): void {
    this.pointCoupons$ = this.recall$.pipe(mergeMap(res=> this.pointCouponService.coupons() ));
  }

}
