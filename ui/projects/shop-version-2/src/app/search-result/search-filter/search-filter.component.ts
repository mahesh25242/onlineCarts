import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ShopProductCategory, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { ShopProductCategoryService, ShopProductService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';
import Notiflix from "notiflix";
import { uniq } from 'lodash';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { MatDrawer } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  private fitered$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

  filters$: Observable<any>;
  products$: Observable<ShopProductWithPagination>;
  categories$: Observable<ShopProductCategory[]>;
  varients: string[] = [];
  type: string[] = [];
  selectedItems: {varients?: string[], types?: string[]} = {varients : [], types: []};


  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "₹" + value;
        case LabelType.High:
          return "₹" + value;
        default:
          return "₹" + value;
      }
    }
  };


  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute,
    private shopProductCategoryService: ShopProductCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



    get fitered(){
      return this.fitered$.asObservable();
    }

    changePrice(){
      let filtered = this.fitered$.getValue() ?? [];
      if(filtered.includes("price") &&
      (this.value == this.options.floor && this.highValue == this.options.ceil) ){
        filtered.splice(filtered.indexOf("price"), 1);
        filtered = (filtered.length) ? filtered : null;
        this.fitered$.next(filtered);
      }else if(!filtered.includes("price")){
        filtered.push("price");
        this.fitered$.next(filtered);
      }
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

    toggle(drawer: MatDrawer){
      if(!this.shopProductService.filters){
        this.shopProductService.showProductsFilters().subscribe(res=>{
          this.options.ceil = res?.max_price
          this.options.floor = res?.min_price


          this.value = this.options.ceil;
          this.highValue = this.options.floor;
        });
      }/*else{
        this.options.ceil = this.shopProductService?.filters?.max_price
        this.options.floor =  this.shopProductService?.filters?.min_price

        this.value = this.options.ceil;
        this.highValue = this.options.floor;

      }*/

      drawer.toggle();
    }

    closedStart(){
      this.ngOnInit();
    }
  ngOnInit(): void {
    this.varients = this.data?.varients;
    this.type = this.data?.type;
    this.categories$ = this.shopProductCategoryService.categories;

    this.filters$ = this.shopProductService.showProductsFilters().pipe(tap(res=>{
      this.options.ceil = res?.max_price
      this.options.floor = res?.min_price


      this.value = this.options.ceil;
      this.highValue = this.options.floor;
    }));
  }

}
