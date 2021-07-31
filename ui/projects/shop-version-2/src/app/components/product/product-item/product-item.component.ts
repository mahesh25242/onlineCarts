import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { find, findIndex } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopProduct, ShopProductVariant } from 'src/app/lib/interfaces';
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

  changeVarient(shop_product_variant: ShopProductVariant = null){
    this.shopProduct.shop_product_primary_variant = shop_product_variant;
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
    }));


  }
  onSwipeLeft(evt){
    let idx = findIndex(this.shopProduct.shop_product_variant, { id: this.shopProduct.shop_product_primary_variant.id})

    this.shopProduct.shop_product_primary_variant = (this.shopProduct.shop_product_variant[(idx+1)] ) ? this.shopProduct.shop_product_variant[(idx+1)] : this.shopProduct.shop_product_variant[0] ;

  }

  onSwipeRight(evt){
    let idx = findIndex(this.shopProduct.shop_product_variant, { id: this.shopProduct.shop_product_primary_variant.id})
    this.shopProduct.shop_product_primary_variant = (this.shopProduct.shop_product_variant[(idx-1)] ) ? this.shopProduct.shop_product_variant[(idx-1)] : this.shopProduct.shop_product_variant[(this.shopProduct.shop_product_variant.length - 1)] ;
  }

}
