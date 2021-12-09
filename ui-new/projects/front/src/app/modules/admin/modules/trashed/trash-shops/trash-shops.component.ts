import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop, ShopWithPagination } from '../../../../../lib/interfaces';
import { ShopService } from '../../../../../lib/services';

@Component({
  selector: 'app-trash-shops',
  templateUrl: './trash-shops.component.html',
  styleUrls: ['./trash-shops.component.scss']
})
export class TrashShopsComponent implements OnInit {
  shops$!: Observable<ShopWithPagination | null>;

  displayedColumns: string[] = ['no', 'name', 'status', 'options'];

  

  constructor(private shopService: ShopService) { }

  delete(shop: Shop | null  = null){
    // Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${shop.name}`, 'Yes', 'No', ()=>{
    //   Notiflix.Loading.Arrows();
    //   this.shopService.deleteShop(shop.id, {force: 1}).pipe(mergeMap(res=>{
    //     return this.shopService.getAllTrashShops().pipe(map(cats=>{
    //       return res;
    //     }));
    //   })).subscribe(res=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Success(`${shop.name} Successfully deleted `);
    //   }, error=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Failure(`unexpected error`);
    //   });
    // }, ()=>{
    //   // No button callback alert('If you say so...');
    // } );
  }

  restore(shop: Shop | null = null){
    // Notiflix.Confirm.Show( 'restore?', `Do you want to restore ${shop.name}`, 'Yes', 'No', ()=>{
    //   Notiflix.Loading.Arrows();
    //   this.shopService.deleteShop(shop.id,  {restore: 1}).pipe(mergeMap(res=>{
    //     return this.shopService.getAllTrashShops().pipe(map(cats=>{
    //       return res;
    //     }));
    //   })).subscribe(res=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Success(`${shop.name} Successfully deleted `);
    //   }, error=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Failure(`unexpected error`);
    //   });
    // }, ()=>{
    //   // No button callback alert('If you say so...');
    // } );
  }

  goto(page: any){
    this.shopService.getAllTrashShops(null, page).subscribe()

  }

  ngOnInit(): void {
    this.shops$ = this.shopService.shops;
  }

}
