import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartDetail, ShopOrder, ShopOrderWithPagination } from '../interfaces';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { map, tap, toArray } from 'rxjs/operators';
import compact from 'lodash/compact';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartDetails$: BehaviorSubject<CartDetail | null> = new BehaviorSubject<CartDetail | null>(null);
  private orders$: BehaviorSubject<ShopOrderWithPagination | null> = new BehaviorSubject<ShopOrderWithPagination | null>(null);
  private isUpdated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hideCartComponent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  shopKey: string | null | undefined = null;
  constructor(private http: HttpClient) { }

  get isUpdated(){
    return this.isUpdated$.asObservable();
  }
  get orders(){
    return this.orders$.asObservable();
  }
  get cartDetails(){
    return this.cartDetails$.asObservable().pipe(map(res=>{
      let total: number = 0;
      let grandTotal: number = 0;


      res?.carts?.map(itm=>{
        if(itm?.price)
          total +=itm?.price;
      });

      if(res?.detail?.selectedLocation && res?.detail?.selectedLocation?.charge){
        grandTotal = total + res?.detail.selectedLocation.charge;
      }else{
        grandTotal = total;
      }

      if(res){
        res.grandTotal = grandTotal;
        res.total = total;
      }

      return res;
    }));
  }

  private getCart(){
    try {
      if(this.shopKey){
        const cart = localStorage.getItem(`${this.shopKey}-cart`);
        return (cart) ?  JSON.parse(cart) : [];
      }else{
        throw 'shop Key not exists';
      }
    } catch (error) {
      console.error(error)
    }
  }

  removeCart(){
    localStorage.removeItem(`${this.shopKey}-cart`);
    this.isUpdated$.next(true);
  }


  cart(): Observable<Cart[]>{
    return  this.isUpdated.pipe(map(res=>{
      const cart:Cart[] = this.getCart();
      let cartDetails = this.cartDetails$.getValue();
      cartDetails = {...cartDetails, ...{ carts: cart }};
      this.cartDetails$.next(cartDetails);
      return cart;
    }));
  }

  updateCart(item: Cart | null = null, action: string='+'): Observable<Cart[]>{
    if(!this.shopKey){
      return throwError(() => new Error('shop Key not exists'));      
    }
    if(item === null){
      return throwError(() => new Error('item not found'));
    }

    if(item?.qty && item?.qty < 0){
      return throwError(() => new Error('invalid quantity'));
    }

    let cart: Cart[] = this.getCart();

    let cartUpdated= false;
    if(!cart.length && action !== '-'){
      cart = [...[item]];
      localStorage.setItem(`${this.shopKey}-cart`, JSON.stringify(cart));
      this.isUpdated$.next(true);
      return of(cart);
    }else{
      return from(cart).pipe(map(cItem =>{
        if(cItem?.product?.id == item?.product?.id
          && cItem?.product?.shop_product_selected_variant?.id == item?.product?.shop_product_selected_variant?.id){
            switch(action){
              case '+':
                if(item?.qty && cItem.qty)
                  cItem.qty += item?.qty;
                cartUpdated = true;
              break;
              case '-':
                if(cItem.qty && item.qty)
                  cItem.qty -= item.qty;
                cartUpdated = true;
              break;
              default:
                cItem.qty = item.qty;
                cItem.message = item.message;
                cartUpdated = true;
              break;
            }
          }


        if(cItem.qty && cItem.qty >0){
          if(cItem?.product?.shop_product_selected_variant?.price)
            cItem.price = (cItem.qty * cItem?.product?.shop_product_selected_variant?.price);          
        }
        
        return cItem;
      }), toArray(), tap(cartArr=> {
        cartArr = compact(cartArr);
        if(!cartUpdated && action !== '-'){
          cartArr.push(item);
          cartUpdated = true;
        }
        localStorage.setItem(`${this.shopKey}-cart`, JSON.stringify(cartArr));
        if(cartUpdated)
          this.isUpdated$.next(true);
      }))
    }


  }

  createOrder(postData:any = null): Observable<ShopOrder>{
    return this.http.post<ShopOrder>(`/shop/createOrder`, postData);
  }

  getAllOrders(page:number= 1,postData:any = null){
    return this.http.post<ShopOrderWithPagination>(`/shop/orders${(page) ? `?page=${page}` : ''}`, postData).pipe(tap(res=>{
      this.orders$.next(res);
    }));
  }

  changeStatus(postData:any = null){
    return this.http.post<any>(`/shop/orders/changeStatus`, postData);
  }

}
