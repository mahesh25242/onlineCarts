import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable,Subscription, throwError } from 'rxjs';
import { mergeMap, map, delay } from 'rxjs/operators';
import { Cart, CartDetail, Shop, ShopDelivery, ShopOrder } from '../../lib/interfaces';
import { CartService, GeneralService, ShopService, MessagingService } from '../../lib/services';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { CurrencyPipe, DatePipe } from '@angular/common'
import { OrderTermsComponent } from './order-terms/order-terms.component';

// import { AngularFireAnalytics } from '@angular/fire/analytics';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe, DatePipe]
})
export class CartDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  customerFrm!: FormGroup;

  botmanWidgetRoot:any;
  

  cart$!: Observable<Cart[]>;
  total:number = 0;
  grandTotal:number = 0;

  environment = environment;
  shop$!:Observable<Shop | null>;
  selectedLocation!: ShopDelivery;
  mapUrl: string = '';
  loc : any =null;
  cartDetails$!: Observable<CartDetail | null>;

  breakPointSubScr!: Subscription;

  breakPointObsr$!: Observable<any>;

  cartSubScr!: Subscription;
  sentToShop!: Subscription;

  unsubscribe$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
    // private analytics: AngularFireAnalytics,
    private _bottomSheet: MatBottomSheet,    
    @Inject('NotiflixService') public notiflix: any) {
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
    this.notiflix.loading.standard();
    this.cartDetails$.pipe(mergeMap(cartDetails=>{

      if(!cartDetails?.carts || !cartDetails?.carts.length) {
        this.matSnackBar.open(`empty cart`, 'close');        
        return throwError(() => 'no cart exists')
      }

      return this.shop$.pipe(mergeMap(shop=>{
        if(!shop) {
          this.matSnackBar.open(`shop may be inactive or deleted.`, 'close');          
          return throwError(() => 'shop may be inactive or deleted')
        }

        // if(!shop.is_mobile_verified){
        //   Notiflix.Notify.Failure('Shop mobile is not verified so can\'t make any order.');
        //   return throwError('mobile not active')
        // }

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
          token: ''
        }

        return this.messagingService.token$.pipe(mergeMap(tkn=>{
          postData.token = (tkn) ? tkn : '';
          return this.cartService.createOrder(postData).pipe(map((orderRes : ShopOrder)=>{
            if(!orderRes) throwError(() => 'no response from server');

            let txt = `%0a‎ Order from *${postData.name}*`;

              txt += `%0a‎ Order: *${encodeURIComponent(`#${orderRes.id}`)}* ( ${cartDetails?.carts?.length} ${ (cartDetails?.carts!.length > 1) ? 'items' : 'item' } )`;
              if(postData.phone){
                txt += `%0a‎ Phone: ${encodeURIComponent(postData.phone)}  `;
              }
              cartDetails?.carts?.map((itm, idx)=>{
                txt += `%0a‎ *${encodeURIComponent(itm?.product?.name ?? '')}* `;
                if(itm.message){
                  txt += `%0a‎ Message: ${encodeURIComponent(itm.message)} `;
                }
                txt += `%0a‎ Varient Name: ${encodeURIComponent(itm?.product?.shop_product_selected_variant?.name ?? '')} `;
                txt += `%0a‎ Quantity: ${encodeURIComponent(itm?.qty ?? 0)} `;
                txt += `%0a‎ Price:  *${encodeURIComponent(this.currencyPipe.transform(itm.price, 'INR') ?? '')}* `;
                txt += `%0a‎ ============== `;
              });
              //txt += `%0a‎ ${ cart.length }  ${ (cart.length > 1) ? 'items' : 'item' } `;

              if(postData.delivery_date && postData.delivery_slot){
                const delivery_date = this.datepipe.transform(cartDetails?.detail?.delivery_date, 'mediumDate');
                txt += `%0a‎ Delivered On: ${encodeURIComponent(delivery_date ?? '')} @ ${postData.delivery_slot}  `;
              }

              if(postData.note){
                txt += `%0a‎ Order Note: ${encodeURIComponent(postData.note)}  `;
              }



              txt += `%0a‎ Delivery Point: ${encodeURIComponent(postData?.selectedLocation?.name ?? '')} `;
              if(postData?.selectedLocation?.need_cust_loc){
                txt += `%0a‎ Address: ${encodeURIComponent(postData?.address ?? '')} `;
                txt += `%0a‎ Pin: ${encodeURIComponent(postData?.pin ?? '')} `;
              }
              if(postData?.selectedLocation?.charge){
                txt += `%0a‎ Delivery Charge: ${encodeURIComponent(this.currencyPipe.transform(postData.selectedLocation.charge, 'INR') ?? '')} %0a `;
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

    })).subscribe({
      next: (res)=>{
        window.location.href = res?.url;
      },
      complete:() =>{
        this.cartService.removeCart();
        
      },
      error:(err) =>{
        let showMsg:boolean = false;
        if(err.status == 422){
          this.matSnackBar.open(`Please check delivery from at top`, 'close');        
          this.generalService.orderFormError$.next(err.error.errors);                   
        }else{
          this.matSnackBar.open(err.error.message, 'close');              
        }
      }
    }).add(() => this.notiflix.loading.remove());      
  }



  deleteItem(itm: Cart){
    
    this.notiflix.confirm( 'Delete', `Do you want to delete?`, 'Yes', 'No', () => {
      this.notiflix.loading.standard();
      // Yes button callback
      itm.qty = 0;
      if(this.cartSubScr) this.cartSubScr.unsubscribe();
      this.cartService.updateCart(itm, '++').subscribe(res=>{
        this.matSnackBar.open(`${itm?.product?.name} - ${itm?.product?.shop_product_selected_variant?.name} successfully removed`, 'close');
      }).add(()=>{
        this.notiflix.loading.remove();
      });
    });

  }




  triggerTerms(){
    let dialogRef = this.dialog.open(OrderTermsComponent, {
      // height: '400px',
      // width: '600px',
    });
  }

  get f(){ return this.customerFrm.controls; }

  editMessage(cart: Cart | null = null){
    let dialogRef = this.dialog.open(EditMessageComponent, {
      data: cart
    });
  }


  checkBreakPoint(){
    return this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]);
  }
  ngOnInit(): void {
    this.botmanWidgetRoot = document.getElementById('botmanWidgetRoot')
   if(this.botmanWidgetRoot){
    this.botmanWidgetRoot?.classList.add('botman-in-cart');
   }
    
    this.cartService.hideCartComponent$.next(true);

    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: `My Cart`,
      url:'',
      backUrl: '/'
    });
    this.shop$ = this.shopService.aShop;

    this.cartDetails$ = this.cartService.cartDetails.pipe(delay(0.50));




    this.customerFrm = this.formBuilder.group({
      terms: [true, []]
    });
    this.breakPointObsr$ = this.checkBreakPoint();


  }

  ngOnDestroy(){
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();

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

    this.botmanWidgetRoot = document.getElementById('botmanWidgetRoot')
    if(this.botmanWidgetRoot){
      this.botmanWidgetRoot?.classList.remove('botman-in-cart');
    }

  }

  ngAfterViewInit(){
    document.querySelector('mat-sidenav-content')!.scrollTop = 0;

  }

}
