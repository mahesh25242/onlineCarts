import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { find, findIndex } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopProduct, ShopProductVariant } from '../../../../lib/interfaces';
import { CartService } from '../../../../lib/services';
import { AddToCartComponent } from '../../add-to-cart/add-to-cart.component';
// import { AddToCartComponent } from '../../../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() shopProduct!: ShopProduct;
  product$!: Observable<ShopProduct>;
  qty:number = 0;
  breakPointObsr$!: Observable<BreakpointState>;


  constructor(public dialog: MatDialog,
    private cartService: CartService,
    private breakpointObserver: BreakpointObserver,) { }

  addToCart(product: ShopProduct, bp: BreakpointState){

    let dialogRef = this.dialog.open(AddToCartComponent, {
      data: product,
      width: (bp.matches) ? '100%' : 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result , product.incart)
    });

    /*  this.cartService.cart$.next(cart);*/
  }

  changeVarient(shop_product_variant: ShopProductVariant | undefined = undefined){
    this.shopProduct.shop_product_primary_variant = shop_product_variant;
  }

  ngOnInit(): void {

    this.breakPointObsr$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]);

    this.shopProduct.incart = false;
    this.product$ = this.cartService.cart().pipe(map(res=>{

      const prod = find(res, {product: {id: this.shopProduct.id}});
      if(prod && prod.product){
        this.shopProduct.incart = true;
      }
      this.qty = prod?.qty ?? 0;

      return this.shopProduct;
    }));


  }
  onSwipeLeft(evt:any){
    let idx = findIndex(this.shopProduct.shop_product_variant, { id: this.shopProduct?.shop_product_primary_variant?.id})

    this.shopProduct.shop_product_primary_variant = (this.shopProduct?.shop_product_variant?.[(idx+1)] ) ? this.shopProduct.shop_product_variant[(idx+1)] : this.shopProduct?.shop_product_variant?.[0] ;

  }

  onSwipeRight(evt: any){
    let idx = findIndex(this.shopProduct.shop_product_variant, { id: this.shopProduct?.shop_product_primary_variant?.id})
    this.shopProduct.shop_product_primary_variant = (this.shopProduct?.shop_product_variant?.[(idx-1)] ) ? this.shopProduct.shop_product_variant[(idx-1)] : this.shopProduct?.shop_product_variant?.[(this.shopProduct.shop_product_variant.length - 1)] ;
  }

}
