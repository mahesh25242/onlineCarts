import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { ShopProduct, ShopProductWithPagination } from '../../../lib/interfaces';
import { ShopProductService, CartService, GeneralService, ShopProductCategoryService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';
import Notiflix from "notiflix";
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import first from 'lodash/first';
import { map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() isSearch!: boolean;
  products$!: Observable<ShopProductWithPagination |  null>;
  allProduct!: ShopProduct[];



  environment = environment;
  current_page: number = 0;

  productFetchUnsbscr!: Subscription;
  constructor(private shopProductService: ShopProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private generalService: GeneralService,
    private shopProductCategoryService: ShopProductCategoryService,
    @Inject('NotiflixService') public notiflix: any) {
      cartService.shopKey = environment.shopKey;
    }




    loadMore(){

      if(this.isSearch && this.current_page){

        this.notiflix.loading.standard();
        ++this.current_page;
        if(this.productFetchUnsbscr) this.productFetchUnsbscr.unsubscribe();
        this.route.params.pipe(mergeMap(res=>{
          const postData = {
            q: res?.['q'],
            pageSize : 50
          }
          return this.shopProductService.showProducts(this.current_page, postData);
        })).subscribe().add(() =>{
          this.notiflix.loading.remove();
        });

      }else if(this.current_page){
        this.notiflix.loading.standard();
        const product:ShopProduct | undefined = first(this.route.snapshot.data["product"]?.data);

        ++this.current_page;
        if(this.productFetchUnsbscr) this.productFetchUnsbscr.unsubscribe();
        this.shopProductService.showProducts(this.current_page, {
          shop_product_category_id: product?.shop_product_category_id,
          pageSize : 50
        }).subscribe().add(() =>{
          this.notiflix.loading.remove();
        });

      }
    }

  ngOnInit(): void {


    this.shopProductService.allProduct = [];
    this.products$ = this.shopProductService.products.pipe(mergeMap(res=>{
      this.current_page = (res?.current_page && res?.next_page_url) ? res?.current_page : 0;
      const product:ShopProduct | undefined = first(res?.data);
      if(!this.isSearch){
        this.shopProductCategoryService.selectedCategory$.next(product?.shop_product_category);
      }else{
        this.shopProductCategoryService.selectedCategory$.next(null);
      }

      if(res?.data){
        res.data.map(itm =>{
          this.shopProductService.allProduct.push(itm);
        });
      }
      this.allProduct = this.shopProductService.allProduct;

      return this.route.params.pipe(map(parms=>{
        if(!parms?.['q']){
          this.generalService.bc$.next({
            siteName: environment.siteName ?? '',
            title: product?.shop_product_category?.name ?? '',
            url:'',
            backUrl: ''
          });
        }

        return (res?.data && res?.data.length) ? res: null;

      }));



    }));
  }


  ngOnDestroy(){
    if(this.productFetchUnsbscr){
      this.productFetchUnsbscr.unsubscribe();
    }
  }
}
