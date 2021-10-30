import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import Notiflix from 'notiflix';
import { Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService, CmsService, CartService } from 'src/app/lib/services';
import { GeneralService, MessagingService } from './lib/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = '';
  showPushNoti: Subscription;
  receiveMessageSubScr: Subscription;
  isAdmin$: Observable<boolean>;
  shop: Shop;
  shop$: Observable<Shop>;

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;


  shopUnsbScr: Subscription;
  constructor(public router: Router,
    private generalService: GeneralService,
    private swUpdate: SwUpdate,
    private messagingService: MessagingService,
    private matSnackBar: MatSnackBar,
    private shopService: ShopService,
    private cartService: CartService,
    private ccService: NgcCookieConsentService,
    private cmsService: CmsService) {

      swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
      });
      swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });

      swUpdate.available.subscribe(event => {
          swUpdate.activateUpdate().then(() => this.updateApp());
      });

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          Notiflix.Loading.Pulse();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          Notiflix.Loading.Remove();
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit(): void {


    this.shop$ = this.shopService.shopDetail().pipe(tap(res=>{
      document.body.className += ` ${res?.shop_theme?.theme?.class}`;
    }))

    this.shopUnsbScr = this.shopService.aShop.pipe(mergeMap(res=>{
      return this.cmsService.pages().pipe(map(pgs => res));
    })).subscribe(res=>{
      this.shop = res;
    });

    this.isAdmin$ = this.generalService.isAdmin$.asObservable();


  	this.receiveMessageSubScr = this.messagingService.requestPermission().pipe(mergeMap(res=>{
      //console.log(res)
      if(res)
        return this.messagingService.receiveMessage()
      else
        of(false);
    })).subscribe(res=>{

    }, error =>{
      console.error('You are disabled notification');
      //this.matSnackBar.open(`You are disabled notification`, 'close');
    });
  	this.showPushNoti = this.messagingService.currentMessage.asObservable().pipe(mergeMap(res=>{
      if(res?.notification?.data?.is_admin){
        const postData = {
          pageSize : 50
        }
       return  this.cartService.getAllOrders(1, postData).pipe(map(ordrs => res))
      }else{
        return of(res);
      }

    })).subscribe(msg=>{
      if(msg)
        this.matSnackBar.open(`${msg.notification?.title} - ${msg.notification?.body}`, 'close');
    })

    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });


  }

  updateApp(){
    document.location.reload();
    console.log("The app is updating right now");

   }

   ngOnDestroy(){
    this.showPushNoti && this.showPushNoti.unsubscribe();
    this.receiveMessageSubScr && this.receiveMessageSubScr.unsubscribe();
    this.shopUnsbScr && this.shopUnsbScr.unsubscribe();

    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();

   }
}
