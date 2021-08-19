import { Component, OnDestroy, OnInit } from '@angular/core';
import { empty, Observable, Subscription } from 'rxjs';
import { ShopProductCategory } from 'src/app/lib/interfaces';
import { ShopProductCategoryService, ShopProductService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, take } from 'rxjs/operators';
import { findIndex } from 'lodash';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  environment = environment;
  categories$: Observable<ShopProductCategory[]>;
  selectedCategory$: Observable<ShopProductCategory>;
  hideTopCat$: Observable<boolean>;
  swipeSubScr: Subscription;
  noSwipeCat:boolean = false;
  constructor(private shopProductCategoryService: ShopProductCategoryService,
    private shopProductService: ShopProductService,
    private route: ActivatedRoute,
    private router: Router,) { }

    onSwipeLeft(evt){
      this.noSwipeCat = false;
      this.swipeSubScr && this.swipeSubScr.unsubscribe();
      this.swipeSubScr = this.selectedCategory$.pipe(take(1),mergeMap(res=>{
        return this.categories$.pipe(map(cats=>{
          const currIdx = findIndex(cats, {id: res?.id});
          if(cats[currIdx+1]){
            this.shopProductCategoryService.selectedCategory$.next(cats[currIdx+1]) ;
          }
          return (cats[currIdx+1]) ? cats[currIdx+1]: null;
        }))
      })).subscribe((res:any)=>{
        if(res?.url)
         this.router.navigate([`/${res?.url}/varities`]);
        else
          this.noSwipeCat = true;
      })

    }

    onSwipeRight(evt){
      this.noSwipeCat = false;
      this.swipeSubScr && this.swipeSubScr.unsubscribe();
      this.swipeSubScr =  this.selectedCategory$.pipe(take(1),mergeMap(res=>{
        return this.categories$.pipe(map(cats=>{
          const currIdx = findIndex(cats, {id: res?.id});
          if(cats[currIdx-1]){
            this.shopProductCategoryService.selectedCategory$.next(cats[currIdx-1]) ;
          }

          return (cats[currIdx-1]) ? cats[currIdx-1]: null;
        }))
      })).subscribe((res:any)=>{
        if(res?.url)
         this.router.navigate([`/${res?.url}/varities`]);
        else
         this.noSwipeCat = true;
      })
    }
  ngOnInit(): void {

    this.hideTopCat$ = this.shopProductCategoryService.hideTopCat;
    this.selectedCategory$ = this.shopProductCategoryService.selectedCategory;
    this.categories$ = this.shopProductCategoryService.categories;
  }

  ngOnDestroy(){
    this.swipeSubScr && this.swipeSubScr.unsubscribe();
  }

}
