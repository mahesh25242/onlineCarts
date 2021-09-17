import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { map, mergeMap } from 'rxjs/operators';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseSubscriptionComponent } from './choose-subscription/choose-subscription.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  shops$: Observable<Shop[]>;
  constructor(private shopService: ShopService,
    private _modalService: NgbModal,) { }


    chooseSubScr(shop: Shop = null){
      const activeModal = this._modalService.open(ChooseSubscriptionComponent);
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
  ngOnInit(): void {
    this.shops$ = this.shopService.shops;
  }

}
