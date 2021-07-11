import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ShopProduct, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { ShopProductService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';
import Notiflix from "notiflix";
import { pick, uniq } from 'lodash';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  products$: Observable<ShopProductWithPagination>;
  varients: string[] = [];
  type: string[] = [];
  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute) { }


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
