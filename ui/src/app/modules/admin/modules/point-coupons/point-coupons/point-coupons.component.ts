import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PointCouponsWithPagination, PointCoupon } from '../interfaces';
import { PointCouponService } from '../services';
import { CreateNewComponent } from './create-new/create-new.component';
import Notiflix from "notiflix";

@Component({
  selector: 'app-point-coupons',
  templateUrl: './point-coupons.component.html',
  styleUrls: ['./point-coupons.component.scss']
})
export class PointCouponsComponent implements OnInit {
  pointCoupons$: Observable<PointCouponsWithPagination>;
  private recall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private pointCouponService: PointCouponService,
    private modalService: NgbModal) { }

  usedReport(pc: PointCoupon | null = null){

  }
  delete(pc: PointCoupon | null = null){
    Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${pc.code}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.pointCouponService.delete(pc).subscribe(res=>{
        this.recall$.next(true);
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${pc.code} Successfully deleted `);
      }, error=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure(`unexpected error`);
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } );
  }
  createOrEdit(pc: PointCoupon | null = null){
    const modalRef = this.modalService.open(CreateNewComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.pc = pc;

    modalRef.result.then((result) => {
      if(result){
        this.recall$.next(true);
      }
    }, (reason) => {

    })
  }



  ngOnInit(): void {
    this.pointCoupons$ = this.recall$.pipe(mergeMap(res=> this.pointCouponService.coupons() ));
  }

}
