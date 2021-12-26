import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopProductCategory, ShopProductWithPagination } from '../../../lib/interfaces';
import { ShopProductCategoryService, ShopProductService } from '../../../lib/services';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  providers:[
    CurrencyPipe
  ]
})
export class SearchFilterComponent implements OnInit {
  private fitered$: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);

  @ViewChild('productCats') productCats: any;


  filters$!: Observable<any>;
  products$!: Observable<ShopProductWithPagination>;
  categories$!: Observable<ShopProductCategory[]>;
  varients: string[] = [];

  selectedItems: any; /*{varients?: string[],  categories?: number[],
    priceFrom?: number, priceTo?: number, productTags?: number[], productVarientTags?: number[]} = {varients : [],  categories: [],
      priceFrom: 0, priceTo: 0, productTags: [], productVarientTags: []};*/



  options: Options = {
    floor: 0,
    ceil: 0,
    translate: (value: number, label: LabelType): string => {
      return this.currencyPipe?.transform(value, 'INR') ?? '';
    }
  };


  constructor(private shopProductService: ShopProductService,
    private shopProductCategoryService: ShopProductCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SearchFilterComponent>,
    private currencyPipe: CurrencyPipe) { }



    get fitered(){
      return this.fitered$.asObservable();
    }

    changePrice(){

       
      let filtered:string[] | null = this.fitered$.getValue() ?? [];
      if(filtered.includes("price") &&
      (this.selectedItems.priceFrom == this.options.floor && this.selectedItems.priceTo == this.options.ceil) ){
        filtered.splice(filtered.indexOf("price"), 1);
        filtered = (filtered.length) ? filtered : null;
        this.fitered$.next(filtered);
      }else if(!filtered.includes("price")){
        filtered.push("price");
        this.fitered$.next(filtered);
      }
    }

    searchSelect(data: string | null = null, idx: string | null = null){      
      if(idx !== null && data &&  this.selectedItems[idx].includes(data)){
        this.selectedItems?[idx].splice(this.selectedItems?.[idx].indexOf(data), 1): null;
        let filtered: string[] | null = this.fitered$.getValue() ?? [];
        filtered.splice(filtered.indexOf(data), 1);
        filtered = (filtered.length) ? filtered : null;
        this.fitered$.next(filtered);
      }else if(idx !== null && data){
        this.selectedItems[idx].push(data);
        let filtered = this.fitered$.getValue() ?? [];
        filtered.push(data);

        this.fitered$.next(filtered);
      }
    }



  ngOnInit(): void {
    
    this.varients = this.data?.varients;

    this.selectedItems = this.data?.selectedItems;
    this.categories$ = this.shopProductCategoryService.categories;

    this.filters$ = this.shopProductService.showProductsFilters().pipe(tap(res=>{


      this.options.ceil = res?.max_price
      this.options.floor = 0; //res?.min_price

      // this.selectedItems.priceFrom = this.selectedItems.priceFrom ?? this.options.ceil;
      // this.selectedItems.priceTo = this.selectedItems.priceTo ?? this.options.floor;
      // console.log(this.selectedItems, this.options)

    }));

  }

}
