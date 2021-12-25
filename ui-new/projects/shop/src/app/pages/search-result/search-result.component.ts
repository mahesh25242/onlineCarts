import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
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
    private router: Router,
    @Inject('NotiflixService') public notiflix: any) { }



    get fitered(){
      return this.fitered$.asObservable();
    }

    openFilter(){
      const dialogRef = this.dialog.open(SearchFilterComponent, {
        width: '400px',
        data: {varients: this.varients,  selectedItems: this.selectedItems}
      });

      dialogRef.afterClosed().pipe(mergeMap(res=>{
        if(res) return this.route.params
        return EMPTY
      })).subscribe(result => {                     
        const parms  =  {...this.selectedItems, ...{sort: this.selectedItems.sort?.name, sortField:  this.selectedItems.sort?.type}};
        this.router.navigate([`/search/${result?.['q']}`, parms]);                            
      });

    }


    sortIt(name: string = 'name', type: string = 'ASC'){
      this.selectedItems.sort!.name= name;
      this.selectedItems.sort!.type= type;
      this.ngOnInit();
    }

  ngOnInit(): void {
    // console.log(1)
    // this.shopProductService.resetShowProducts();

    
    // this.products$ = this.route.params.pipe(mergeMap(res=>{
    //     this.notiflix.loading.standard();        
    //     const parms = {
    //       categories: res?.['categories']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) ?? [],
    //       priceFrom: res?.['priceFrom'] ?? '',
    //       priceTo: res?.['priceTo'] ?? '',
    //       productTags: res?.['productTags']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) ?? [],
    //       sort: { name: res?.['sort'] ?? 'name', type: res?.['sortField'] ?? 'ASC'},
    //       varients: res?.['varients']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) ?? [],
    //     };

    //     this.selectedItems = {...parms};
    //     console.log(this.selectedItems)
    //     const postData = {
    //       q: res?.['q'],
    //       pageSize : 50,
    //       selectedItems: parms
    //     }

    //     this.generalService.bc$.next({
    //       siteName: environment.siteName ?? '',
    //       title: `${res?.['q']}`,
    //       url:'',
    //       backUrl: `/`,
    //       other: res
    //     });

    //     return this.shopProductService.showProducts(1, postData);
    //   }), tap(res=> {
        
    //     res?.data?.map(pdt =>{
    //       pdt?.shop_product_variant?.map(spv=>{
    //         this.varients.push(spv?.name!.toLowerCase());
    //       })
    //     })
    //     this.varients = uniq(this.varients);

    //     this.notiflix.loading.remove();
    //   }));

      this.categories$ = this.shopProductCategoryService.categories;

  }

}
