import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Shop } from './lib/interfaces';
import { ShopService, CmsService, CartService, ThemeService } from './lib/services';
import { GeneralService,  } from './lib/services'; //MessagingService

declare const botmanChatWidget:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  lastScroll:number = 0;
  currentTheme$!: Observable<string | undefined>;
  @HostListener('window:scroll', ['$event']) // for window scroll events
onScroll(event:any) {

  this.lastScroll;
  if (event.target.scrollTop > this.lastScroll){
    this.lastScroll = event.target.scrollTop;
    if(document.getElementById('botmanWidgetRoot') &&  !document.getElementById('opened')){
      const botmanWidgetRoot = document.getElementById('botmanWidgetRoot');
      if(botmanWidgetRoot)
        botmanWidgetRoot.style.display = 'none';
    }
    if(document.getElementById('page-cart-btn')){
      const pageCartBtn = document.getElementById('page-cart-btn');
      if(pageCartBtn){
        pageCartBtn.style.display = 'none';
      }
    }
      
    // document.getElementById('cart-header').style.display = 'block';
    // document.getElementById('page-main').style.marginTop = '56px';
    // downscroll code
 } else{
    this.lastScroll = event.target.scrollTop;
    if(document.getElementById('botmanWidgetRoot') && !document.getElementById('opened')){
      const botmanWidgetRoot = document.getElementById('botmanWidgetRoot');
      if(botmanWidgetRoot)
        botmanWidgetRoot.style.display = 'block';
    }
      
    if(document.getElementById('page-cart-btn')){
      const pageCartBtn = document.getElementById('page-cart-btn');
      if(pageCartBtn)
        pageCartBtn.style.display = 'block';
    }
      
    // document.getElementById('cart-header').style.display = 'none';
    // document.getElementById('page-main').style.marginTop = '0px';
    // upscroll code
 }
}

  title = '';
  showPushNoti!: Subscription;
  receiveMessageSubScr!: Subscription;
  isAdmin$!: Observable<boolean | null>;
  shop!: Shop | null;
  shop$!: Observable<Shop>;

  isNotiflixBlock: boolean = false;

  private popupOpenSubscription: Subscription | undefined;
  private popupCloseSubscription: Subscription | undefined;
  private initializeSubscription: Subscription | undefined;
  private statusChangeSubscription: Subscription | undefined;
  private revokeChoiceSubscription: Subscription | undefined;
  private noCookieLawSubscription: Subscription | undefined;


  shopUnsbScr: Subscription | undefined;
  constructor(public router: Router,
    private generalService: GeneralService,
    private themeService: ThemeService,
    // private swUpdate: SwUpdate,
    // private messagingService: MessagingService,
    private matSnackBar: MatSnackBar,
    private shopService: ShopService,
    private cartService: CartService,    
    private cmsService: CmsService) {

      // swUpdate.available.subscribe(event => {
      //   console.log('current version is', event.current);
      //   console.log('available version is', event.available);
      // });
      // swUpdate.activated.subscribe(event => {
      //   console.log('old version was', event.previous);
      //   console.log('new version is', event.current);
      // });

      // swUpdate.available.subscribe(event => {
      //     swUpdate.activateUpdate().then(() => this.updateApp());
      // });

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          // this.isNotiflixBlock  = !!document.getElementById("page-main");
          // document.getElementById("page-main") && Notiflix.Block.Pulse('#page-main');
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {

          if(document.getElementById('botmanWidgetRoot')){
            const botmanWidgetRoot = document.getElementById('botmanWidgetRoot');
            if(botmanWidgetRoot){
              botmanWidgetRoot.style.display = 'block';
            }            
          }
          if(document.getElementById('page-cart-btn')){
            const pageCartBtn = document.getElementById('page-cart-btn');
            if(pageCartBtn){
              pageCartBtn.style.display = 'block';
            }            
          }
          // this.isNotiflixBlock && Notiflix.Block.Remove('#page-main');
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {
    /*theme setting */
    this.currentTheme$ = this.themeService.currentTheme;



    window.addEventListener("message", (event) => {
      if(event?.data?.redirect){
        this.router.navigate([event.data.redirect]);
        if(window.screen.width < 500){
          botmanChatWidget.close()
        }
      }

    }, false);

    // this.shop$ = this.shopService.shopDetail().pipe(tap(res=>{
    //   document.body.className += ` ${res?.shop_theme?.theme?.class}`;
    // }))

    this.shopUnsbScr = this.shopService.aShop.pipe(mergeMap(res=>{ 
      console.log(res)  
      this.themeService._currentTheme$.next(res?.shop_theme?.theme?.class);   
      return this.cmsService.pages().pipe(map(pgs => res));
    })).subscribe(res=>{
      this.shop = res;
    });
    


  	// this.receiveMessageSubScr = this.messagingService.requestPermission().pipe(mergeMap(res=>{
    //   //console.log(res)
    //   if(res)
    //     return this.messagingService.receiveMessage()
    //   else
    //     of(false);
    // })).subscribe((res:any)=>{

    // }, (error:any) =>{
    //   console.error('You are disabled notification');
    //   //this.matSnackBar.open(`You are disabled notification`, 'close');
    // });
  	// this.showPushNoti = this.messagingService.currentMessage.asObservable().pipe(mergeMap((res:any)=>{
    //   if(res?.notification?.data?.is_admin){
    //     const postData = {
    //       pageSize : 50
    //     }
    //    return  this.cartService.getAllOrders(1, postData).pipe(map(ordrs => res))
    //   }else{
    //     return of(res);
    //   }

    // })).subscribe((msg:any)=>{
    //   if(msg)
    //     this.matSnackBar.open(`${msg.notification?.title} - ${msg.notification?.body}`, 'close');
    // })

    



  }

  updateApp(){
    document.location.reload();
    console.log("The app is updating right now");

   }

   ngOnDestroy(){
    this.showPushNoti && this.showPushNoti.unsubscribe();
    this.receiveMessageSubScr && this.receiveMessageSubScr.unsubscribe();
    this.shopUnsbScr && this.shopUnsbScr.unsubscribe();

    this.popupOpenSubscription && this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription && this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription && this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription && this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription && this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription && this.noCookieLawSubscription.unsubscribe();

   }
}