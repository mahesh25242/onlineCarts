import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, mergeMap, Observable } from 'rxjs';
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

  

  constructor(private shopService: ShopService,
    @Inject('NotiflixService') public notiflix: any,
    private _snackBar: MatSnackBar) { }

  delete(shop: Shop | null  = null){
    this.notiflix.confirm( 'delete?', `Do you want to delete ${shop?.name}`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard();
      this.shopService.deleteShop(shop?.id, {force: 1}).pipe(mergeMap(res=>{
        return this.shopService.getAllTrashShops().pipe(map(cats=>{
          return res;
        }));
      })).subscribe({
        next: res=>{
          this._snackBar.open(`${shop?.name} Successfully deleted `, 'Close');                 
        }
      }).add(()=>{
        this.notiflix.loading.remove();
      });
    });
  }

  restore(shop: Shop | null = null){
    this.notiflix.confirm( 'restore?', `Do you want to restore ${shop?.name}`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard();
      this.shopService.deleteShop(shop?.id,  {restore: 1}).pipe(mergeMap(res=>{
        return this.shopService.getAllTrashShops().pipe(map(cats=>{
          return res;
        }));
      })).subscribe({
        next: res=>{
          this.notiflix.loading.remove();
          this._snackBar.open(`${shop?.name} Successfully restored `, 'Close');     
        },

      }).add(()=>{
        this.notiflix.loading.remove();
        this._snackBar.open(`${shop?.name} Successfully restored `, 'Close');     
      });
    });
  }

  goto(page: any){
    this.shopService.getAllTrashShops(null, page).subscribe()

  }

  ngOnInit(): void {
    this.shops$ = this.shopService.shops;
  }

}
