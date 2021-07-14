import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ShopProduct, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { ShopProductService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';
import Notiflix from "notiflix";
import { pick, uniq } from 'lodash';
import { LabelType, Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  products$: Observable<ShopProductWithPagination>;
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
          return "$" + value;
      }
    }
  };


  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute) { }


    searchSelect(data: string = null, idx: string = null){
      if(this.selectedItems[idx].includes(data)){
        this.selectedItems[idx].splice(this.selectedItems[idx].indexOf(data), 1)
      }else{
        this.selectedItems[idx].push(data);
      }
    }

    toggle(drawer){
      if(!this.shopProductService.filters){
        this.shopProductService.showProductsFilters().subscribe(res=>{
          this.options.ceil = res?.max_price
          this.options.floor = res?.min_price
        });
      }else{
        this.options.ceil = this.shopProductService?.filters?.max_price
        this.options.floor =  this.shopProductService?.filters?.min_price
      }
      drawer.toggle();
    }
  ngOnInit(): void {

    this.products$ = this.route.params.pipe(mergeMap(res=>{
      Notiflix.Loading.Arrows();
      const postData = {
        q: res?.q,
        pageSize : environment.productListPerPage
      }
      return this.shopProductService.showProducts(1, postData);
    }), tap(res=> {
      res?.data.map(pdt =>{
        pdt.shop_product_variant.map(spv=>{
          this.varients.push(spv?.name.toLowerCase());
          this.type.push(spv?.type?.name.toLowerCase());
        })
      })
      this.varients = uniq(this.varients);
      this.type = uniq(this.type);


      Notiflix.Loading.Remove();
    }));
  }

}
