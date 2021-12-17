import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ShopProductCategory, ShopProductWithPagination } from '../../lib/interfaces';
import { GeneralService, ShopProductCategoryService, ShopProductService } from '../../lib/services';
import { environment } from '../.././../environments/environment';
import uniq from 'lodash/uniq';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilterComponent } from './search-filter/search-filter.component';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  private fitered$: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);

  products$!: Observable<ShopProductWithPagination>;
  categories$!: Observable<ShopProductCategory[]>;
  varients: string[] = [];

  selectedItems: {varients?: string[],  categories?: number[],
    priceFrom?: number, priceTo?: number, sort?: { name?: string, type?: string }} = {varients : [],  categories: [], priceFrom: 0, priceTo: 0, sort: {name:'name', type: 'ASC'}};




  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute,
    private shopProductCategoryService: ShopProductCategoryService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    @Inject('NotiflixService') public notiflix: any) { }



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


    sortIt(name: string = 'name', type: string = 'ASC'){
      this.selectedItems.sort!.name= name;
      this.selectedItems.sort!.type= type;
      this.ngOnInit();
    }

  ngOnInit(): void {

    this.products$ = this.route.params.pipe(mergeMap(res=>{
        this.notiflix.loading.standard();
        const postData = {
          q: res?.['q'],
          pageSize : 50,
          selectedItems: this.selectedItems
        }

        this.generalService.bc$.next({
          siteName: environment.siteName ?? '',
          title: `${res?.['q']}`,
          url:'',
          backUrl: `/`,
          other: res
        });

        return this.shopProductService.showProducts(1, postData);
      }), tap(res=> {
        res?.data?.map(pdt =>{
          pdt?.shop_product_variant?.map(spv=>{
            this.varients.push(spv?.name!.toLowerCase());
          })
        })
        this.varients = uniq(this.varients);

        this.notiflix.loading.remove();
      }));

      this.categories$ = this.shopProductCategoryService.categories;

  }

}
