import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shop, ShopWithPagination } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { map, mergeMap } from 'rxjs/operators';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseSubscriptionComponent } from './choose-subscription/choose-subscription.component';
import { ChangeStatusComponent } from './change-status/change-status.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  shops$: Observable<ShopWithPagination>;


  constructor(private shopService: ShopService,
    private _modalService: NgbModal,) { }


    chooseSubScr(shop: Shop = null){
      const activeModal = this._modalService.open(ChooseSubscriptionComponent, {
        size: 'lg'
      });
      activeModal.componentInstance.shop = shop;
    }

    changeStatus(shop: Shop = null){
      const activeModal = this._modalService.open(ChangeStatusComponent, {
        size: 'lg'
      });
      activeModal.componentInstance.shop = shop;



    }
  delete(shop: Shop = null){
    Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${shop.name}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopService.deleteShop(shop.id).pipe(mergeMap(res=>{
        return this.shopService.getAllShops().pipe(map(cats=>{
          return res;
        }));
      })).subscribe(res=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${shop.name} Successfully deleted `);
      }, error=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure(`unexpected error`);
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } );
  }

  loadPage(page){
    this.shopService.getAllShops(null, page).subscribe()

  }

  ngOnInit(): void {
    this.shops$ = this.shopService.shops;
  }

}
