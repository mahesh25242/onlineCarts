import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ShopCategoryService } from 'src/app/lib/services';
import { ShopCategory } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.component.html',
  styleUrls: ['./shop-categories.component.scss']
})
export class ShopCategoriesComponent implements OnInit, OnDestroy {
  shopCategory$: Observable<ShopCategory[]>;

  constructor(private _modalService: NgbModal,
    private router: Router,
    private shopCategoryService: ShopCategoryService) { }

  ngOnInit(): void {
    this.shopCategory$ = this.shopCategoryService.categories();
  }

  ngOnDestroy(){

  }
}
