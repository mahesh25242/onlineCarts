import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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
    public dialog: MatDialog) { }

  usedReport(pc: PointCoupon | null = null){

  }
  delete(pc: PointCoupon | null = null){
    // Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${pc.code}`, 'Yes', 'No', ()=>{
    //   Notiflix.Loading.Arrows();
    //   this.pointCouponService.delete(pc).subscribe(res=>{
    //     this.recall$.next(true);
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Success(`${pc.code} Successfully deleted `);
    //   }, error=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Failure(`unexpected error`);
    //   });
    // }, ()=>{
    //   // No button callback alert('If you say so...');
    // } );
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
