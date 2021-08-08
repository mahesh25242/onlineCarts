import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopProduct, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { GeneralService, ShopProductService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { map, mergeMap } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  environment = environment;
  pageEvent: PageEvent;
  products$: Observable<ShopProductWithPagination>;
  private product$: BehaviorSubject<ShopProduct> = new BehaviorSubject<ShopProduct>(null);
  displayedColumns: string[] = ['no', "image", 'name', 'category',  'status', 'options'];

  constructor(private shopProductService: ShopProductService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    private router: Router,) { }

  get product() { return this.product$.asObservable()}


  changeStatus(cat: ShopProduct = null){
    Notiflix.Confirm.Show( 'Change Status?', `Do you want to change ${cat.name} status?`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopProductService.changeStatus(cat).pipe(mergeMap(res=>{
        const page = (this.pageEvent?.pageIndex) ? (this.pageEvent?.pageIndex + 1) : 1;
        return this.shopProductService.listproducts(page, {
          pageSize: (this.pageEvent?.pageSize) ? this.pageEvent?.pageSize :10
        }).pipe(map(cats=>{
          return res;
        }));
      })).subscribe(res=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${cat.name} Successfully deleted `);
      }, error=>{
        console.log(error)
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure(`unexpected error`);
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } );
  }


  deleteProduct(product: ShopProduct = null){
    Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${product.name}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopProductService.deleteProduct(product).pipe(mergeMap(res=>{
        return this.shopProductService.listproducts((this.paginator.pageIndex+1), {
          pageSize: this.paginator.pageSize
        }).pipe(map((products)=>{
          if(!products.data || !products.data.length){
            let prevPage = this.paginator.pageIndex - 1;
            prevPage = (prevPage < 0) ? 0 : prevPage;
            this.router.navigate([`admin/products/${prevPage}`]);
          }else{
            return res
          }
        }));
      })).subscribe(()=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${product.name} Successfully deleted `);
      }, ()=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure(`unexpected error`);
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } );
  }

  goto(pageEvent: PageEvent){
    this.pageEvent = pageEvent;
    this.router.navigate([`admin/products/${this.paginator.pageIndex}`,  { pageSize: pageEvent.pageSize }]);


    // Notiflix.Loading.Arrows();
    // this.pageEvent = pageEvent;
    // const postData = {
    //   pageSize : this.pageEvent.pageSize
    // }
    // this.shopProductService.listproducts((this.pageEvent.pageIndex + 1), postData).subscribe(res=>{
    //   Notiflix.Loading.Remove();
    // }, error=>{
    //   Notiflix.Loading.Remove();
    // });

  }

  ngOnInit(): void {

    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Products',
      url:'',
      backUrl: null
    });

    this.products$ = this.shopProductService.products;
  }

}
