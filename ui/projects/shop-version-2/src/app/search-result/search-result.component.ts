import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { debounce, mergeMap, tap } from 'rxjs/operators';
import { ShopProductCategory, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { GeneralService, ShopProductCategoryService, ShopProductService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';
import Notiflix from "notiflix";
import { uniq } from 'lodash';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilterComponent } from './search-filter/search-filter.component';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private fitered$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

  products$: Observable<ShopProductWithPagination>;
  categories$: Observable<ShopProductCategory[]>;
  varients: string[] = [];

  selectedItems: {varients?: string[],  categories?: number[],
    priceFrom?: number, priceTo?: number, sort?: { name?: string, type?: string }} = {varients : [],  categories: [], priceFrom: 0, priceTo: 0, sort: {name:'name', type: 'ASC'}};




  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute,
    private shopProductCategoryService: ShopProductCategoryService,
    public dialog: MatDialog,
    private generalService: GeneralService,) { }



    get fitered(){
      return this.fitered$.asObservable();
    }

    openFilter(){
      const dialogRef = this.dialog.open(SearchFilterComponent, {
        width: '400px',
        data: {varients: this.varients,  selectedItems: this.selectedItems}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.ngOnInit();
      });

    }

    searchSelect(data: string = null, idx: string = null){
      if(this.selectedItems[idx].includes(data)){
        this.selectedItems[idx].splice(this.selectedItems[idx].indexOf(data), 1);
        let filtered = this.fitered$.getValue() ?? [];
        filtered.splice(filtered.indexOf(data), 1);
        filtered = (filtered.length) ? filtered : null;
        this.fitered$.next(filtered);
      }else{
        this.selectedItems[idx].push(data);
        let filtered = this.fitered$.getValue() ?? [];
        filtered.push(data);

        this.fitered$.next(filtered);
      }
    }



  ngOnInit(): void {

    this.products$ = this.route.params.pipe(mergeMap(res=>{
        Notiflix.Loading.Arrows();
        const postData = {
          q: res?.q,
          pageSize : environment.productListPerPage,
          selectedItems: this.selectedItems
        }

        this.generalService.bc$.next({
          siteName: environment.siteName,
          title: `${res?.q}`,
          url:'',
          backUrl: `/`,
          other: res
        });

        return this.shopProductService.showProducts(1, postData);
      }), tap(res=> {
        res?.data.map(pdt =>{
          pdt.shop_product_variant.map(spv=>{
            this.varients.push(spv?.name.toLowerCase());
          })
        })
        this.varients = uniq(this.varients);


        Notiflix.Loading.Remove();
      }));

      this.categories$ = this.shopProductCategoryService.categories;

  }

}
