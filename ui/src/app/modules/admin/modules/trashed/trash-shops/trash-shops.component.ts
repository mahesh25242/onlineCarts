import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-trash-shops',
  templateUrl: './trash-shops.component.html',
  styleUrls: ['./trash-shops.component.scss']
})
export class TrashShopsComponent implements OnInit {
  shops$: Observable<Shop[]>;

  constructor(private shopService: ShopService) { }

  delete(shop: Shop = null){
    Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${shop.name}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopService.deleteShop(shop.id, {force: 1}).pipe(mergeMap(res=>{
        return this.shopService.getAllTrashShops().pipe(map(cats=>{
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

  restore(shop: Shop = null){
    Notiflix.Confirm.Show( 'restore?', `Do you want to restore ${shop.name}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopService.deleteShop(shop.id,  {restore: 1}).pipe(mergeMap(res=>{
        return this.shopService.getAllTrashShops().pipe(map(cats=>{
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
