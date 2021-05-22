import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopProduct, ShopProductWithPagination } from 'src/app/lib/interfaces';
import { CartService } from 'src/app/lib/services';
import { AddToCartComponent } from '../../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() shopProduct: ShopProduct;
  product$: Observable<ShopProduct>;
  qty:number = 0;

  constructor(public dialog: MatDialog,
    private cartService: CartService) { }

  addToCart(product: ShopProduct){
    let dialogRef = this.dialog.open(AddToCartComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result , product.incart)
    });

    /*  this.cartService.cart$.next(cart);*/
    }


  ngOnInit(): void {
    this.shopProduct.incart = false;
    this.product$ = this.cartService.cart().pipe(map(res=>{

      const prod = find(res, {product: {id: this.shopProduct.id}});
      if(prod && prod.product){
        this.shopProduct.incart = true;
      }
      this.qty =prod?.qty;

      return this.shopProduct;
    }))
  }


}
