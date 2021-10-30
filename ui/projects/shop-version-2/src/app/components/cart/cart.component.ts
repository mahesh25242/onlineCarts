import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from 'src/app/lib/interfaces';
import { CartService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('scroller')
  scroller: ElementRef;
  displayDiv = true;

  hideCartComponent$: Observable<boolean>;
  cart$: Observable<Cart[]>;
  total:number = 0;
  cartDetails: boolean = false;
  isChanged = true;
  classExists: boolean = true;



  constructor(private cartService: CartService) {
    cartService.shopKey = environment.shopKey;
  }




  updateCart(cart: Cart, action: string='+'){
    const itm =Object.assign({}, cart);
    itm.qty = 1;
    this.cartService.updateCart(itm, action).subscribe();
  }


  ngOnInit(): void {
    this.hideCartComponent$ = this.cartService.hideCartComponent$.asObservable().pipe(tap(res=>{
      if(res){
        this.classExists = true;
      }
    }));
    let anyChange = 0;
    this.cart$ = this.cartService.cart().pipe(tap(res=>{
      this.total = 0;

      res.map(itm=>{
        this.total +=itm.price;
      });


      if(anyChange != this.total){
        if(anyChange){
          this.isChanged = false;
          setTimeout(() => { this.isChanged = true}, 1000)
        }

        anyChange = this.total;

      }

    }));




  }


}
