import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable,of,Subscription, throwError } from 'rxjs';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';
import { Cart, CartDetail, Shop, ShopDelivery, ShopOrder } from 'src/app/lib/interfaces';
import { CartService, GeneralService, ShopService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { EditMessageComponent } from './edit-message/edit-message.component';
import Notiflix from "notiflix";
import { CurrencyPipe, DatePipe } from '@angular/common'
import { OrderTermsComponent } from './order-terms/order-terms.component';
import { MessagingService } from '../lib/services';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  customerFrm: FormGroup;



  cart$: Observable<Cart[]>;
  total:number = 0;
  grandTotal:number = 0;

  environment = environment;
  shop$:Observable<Shop>;
  selectedLocation: ShopDelivery;
  mapUrl: string = '';
  loc : any =null;
  cartDetails$: Observable<CartDetail>;

  breakPointSubScr: Subscription;

  breakPointObsr$: Observable<any>;

  cartSubScr: Subscription;
  sentToShop: Subscription;
  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,
    private shopService: ShopService,
    private matSnackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private generalService: GeneralService,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private messagingService: MessagingService,
    private analytics: AngularFireAnalytics) {
    cartService.shopKey = environment.shopKey;
  }

  updateCart(cart: Cart, action: string='+'){
    const itm =Object.assign({}, cart);
    itm.qty = 1;
    if(this.cartSubScr) this.cartSubScr.unsubscribe();
    this.cartSubScr = this.cartService.updateCart(itm, action).subscribe();
  }

  sendToShop(bp:any = null){

    this.generalService.orderFormError$.next(null);
    // if(!this.f.selectedLocation.value?.id){
    //   //this.matSnackBar.open('Please choose a delivery location.', 'close');
    //   el.scrollIntoView({behavior:"smooth"});
    //   return;
    // }

    // if(!this.f.delivery_date.value){
    //   this.f.is_delivery_date.setValue(false);
    // }
    Notiflix.Loading.Arrows();
    this.sentToShop = this.cartDetails$.pipe(mergeMap(cartDetails=>{

      if(!cartDetails?.carts || !cartDetails?.carts.length) {
        Notiflix.Notify.Failure('empty cart.');
        return throwError('no cart exists')
      }

      return this.shop$.pipe(mergeMap(shop=>{
        if(!shop) {
          Notiflix.Notify.Failure('shop may be inactive or deleted.');
          return throwError('shop may be inactive or deleted')
        }

        if(!shop.is_mobile_verified){
          Notiflix.Notify.Failure('Shop mobile is not verified so can\'t make any order.');
          return throwError('mobile not active')
        }

        let  delivery_date = null;
        if(cartDetails?.detail?.delivery_date){
          delivery_date = this.datepipe.transform(cartDetails?.detail?.delivery_date, 'dd/MM/yyyy');
        }


        const postData = {
          cart: cartDetails.carts,
          name: cartDetails?.detail?.name,
          note: cartDetails?.detail?.note,
          email: cartDetails?.detail?.email,
          phone: cartDetails?.detail?.phone,
          address: cartDetails?.detail?.address,
          pin: cartDetails?.detail?.pin,
          selectedLocation: cartDetails?.detail?.selectedLocation,
          grad_total: cartDetails?.grandTotal,
          loc :this.loc,
          delivery_date: delivery_date,
          delivery_slot: cartDetails?.detail?.delivery_slot,
          token: null
        }

        return this.messagingService.getToken().pipe(mergeMap(tkn=>{
          postData.token = (tkn) ? tkn : '';
          return this.cartService.createOrder(postData).pipe(map((orderRes : ShopOrder)=>{
            if(!orderRes) throwError('no response from server');

            let txt = `%0a‎ Order from *${postData.name}*`;

              txt += `%0a‎ Order: *${encodeURIComponent(`#${orderRes.id}`)}* ( ${cartDetails.carts.length} ${ (cartDetails.carts.length > 1) ? 'items' : 'item' } )`;
              if(postData.phone){
                txt += `%0a‎ Phone: ${encodeURIComponent(postData.phone)}  `;
              }
              cartDetails.carts.map((itm, idx)=>{
                txt += `%0a‎ *${encodeURIComponent(itm.product.name)}* `;
                if(itm.message){
                  txt += `%0a‎ Message: ${encodeURIComponent(itm.message)} `;
                }
                txt += `%0a‎ Varient Name: ${encodeURIComponent(itm.product.shop_product_selected_variant.name)} `;
                txt += `%0a‎ Quantity: ${encodeURIComponent(itm.qty)} `;
                txt += `%0a‎ Price:  *${encodeURIComponent(this.currencyPipe.transform(itm.price, 'INR'))}* `;
                txt += `%0a‎ ============== `;
              });
              //txt += `%0a‎ ${ cart.length }  ${ (cart.length > 1) ? 'items' : 'item' } `;

              if(postData.delivery_date && postData.delivery_slot){
                const delivery_date = this.datepipe.transform(cartDetails?.detail?.delivery_date, 'mediumDate');
                txt += `%0a‎ Delivered On: ${encodeURIComponent(delivery_date)} @ ${postData.delivery_slot}  `;
              }

              if(postData.note){
                txt += `%0a‎ Order Note: ${encodeURIComponent(postData.note)}  `;
              }



              txt += `%0a‎ Delivery Point: ${encodeURIComponent(postData.selectedLocation.name)} `;
              if(postData.selectedLocation.need_cust_loc){
                txt += `%0a‎ Address: ${encodeURIComponent(postData.address)} `;
                txt += `%0a‎ Pin: ${encodeURIComponent(postData.pin)} `;
              }
              if(postData.selectedLocation.charge){
                txt += `%0a‎ Delivery Charge: ${encodeURIComponent(this.currencyPipe.transform(postData.selectedLocation.charge, 'INR'))} %0a `;
              }

              if(orderRes.sec_key){
                txt += `%0a‎ Track Order: ${shop.shop_url}/order/${orderRes.sec_key} %0a `;
              }
              let locUrl= null;
              if(postData.loc?.lat && postData.loc?.lon){
                locUrl = `https://www.google.com/maps/search/?api=1&query=${postData.loc.lat},${postData.loc.lon}`;
                locUrl = encodeURIComponent(locUrl);
              }
              if(locUrl)
                txt += `%0a‎ Location: ${locUrl} %0a`;

              txt += `%0a‎ Grand Total: *${this.currencyPipe.transform(cartDetails.grandTotal, 'INR')}* %0a`;
              txt += `%0a‎ ============== %0a`;
              txt += `%0a‎ *Order confirmation through reply/call* %0a`;

              let ret;
              if(bp.matches){
                ret = {
                  url: `https://api.whatsapp.com/send?phone=${shop.phone}&text=${txt}`
                }
              }else{
                ret = {
                  url: `https://web.whatsapp.com/send?phone=${shop.phone}&text=${txt}`
                }
              }
              return ret;

          }))
        }))
      }));

    })).subscribe(res=>{
      this.cartService.removeCart();
      this.analytics.logEvent('purchases', res);

      window.location.href = res.url;
      Notiflix.Loading.Remove();
    }, error=>{

      Notiflix.Loading.Remove();
      let showMsg:boolean = false;
      if(error.status == 422){

        this.generalService.orderFormError$.next(error.error.errors);
        // for(let result in deliveryLocationDom?.customerFrm.controls){
        //   if(error.error.errors[result]){
        //     deliveryLocationDom?.customerFrm.controls[result].markAsTouched();
        //     deliveryLocationDom?.customerFrm.controls[result].setErrors({ error: error.error.errors[result] });
        //     showMsg = true;
        //   }else{
        //     deliveryLocationDom?.customerFrm.controls[result].setErrors(null);

        //   }
        // }
        showMsg && Notiflix.Notify.Failure('Please check delivery from at top.');



      }

    });




  }



  deleteItem(itm: Cart){
    itm.qty = 0;
    if(this.cartSubScr) this.cartSubScr.unsubscribe();
    this.cartSubScr = this.cartService.updateCart(itm, '++').subscribe(res=>{
      this.matSnackBar.open(`${itm.product.name} - ${itm.product.shop_product_selected_variant.name} successfully removed`, 'close');
    });
  }




  triggerTerms(){
    let dialogRef = this.dialog.open(OrderTermsComponent, {
      // height: '400px',
      // width: '600px',
    });
  }

  get f(){ return this.customerFrm.controls; }

  editMessage(cart: Cart = null){
    let dialogRef = this.dialog.open(EditMessageComponent, {
      data: cart
    });
  }

  checkBreakPoint(){

    return this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).pipe(mergeMap(brakPoints=>{

      if (brakPoints.matches && navigator.geolocation) {
        return this.generalService.getLocation().pipe(mergeMap(coords=>{
          if(coords){
            this.loc = {
              lat: coords?.coords?.latitude,
              lon: coords?.coords?.longitude
            }
            this.mapUrl = `${environment.gMapUrl}/maps?z=12&t=m&q=loc:${coords?.coords?.latitude}+${coords?.coords?.longitude}`;
            return this.generalService.reverseLatLngAddress(this.loc).pipe(map(mAddress=>{

              if(this.f.pin && !this.f.pin.value && mAddress?.address?.postcode){
                this.f.pin.setValue(mAddress?.address?.postcode)
              }

              if(this.f.address && !this.f.address.value && mAddress?.display_name){
                this.f.address.setValue(mAddress?.display_name)
              }
              return brakPoints
            }));
          }else{
            this.mapUrl = null;
            return of(brakPoints);
          }

        }), catchError(err =>{
          switch(err?.code){
            case 1:
              this.matSnackBar.open('Location Permission denied.', 'close');
            break;
            case 2:
              this.matSnackBar.open('Sorry your position is unavailable.', 'close');
            break;
            case 3:
              this.matSnackBar.open('Sorry your position request was timeout. Please try again.', 'close');
            break;
            default:
              this.matSnackBar.open('Sorry unexpected error occur.', 'close');
            break;
          }
          return of(brakPoints);
        }))
      }else{
        return of(brakPoints)
      }

    }));
  }
  ngOnInit(): void {
    this.cartService.hideCartComponent$.next(true);

    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: `My Cart`,
      url:'',
      backUrl: '/'
    });
    this.shop$ = this.shopService.aShop;

    this.cartDetails$ = this.cartService.cartDetails.pipe(delay(200));




    this.customerFrm = this.formBuilder.group({
      terms: [true, []]
    });
    this.breakPointObsr$ = this.checkBreakPoint();


  }

  ngOnDestroy(){
    this.cartService.hideCartComponent$.next(false);
    if(this.breakPointSubScr){
      this.breakPointSubScr.unsubscribe();
    }

    if(this.cartSubScr){
      this.cartSubScr.unsubscribe();
    }

    if(this.sentToShop){
      this.sentToShop.unsubscribe();
    }

  }


}
