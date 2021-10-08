import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { BC, Shop, User } from 'src/app/lib/interfaces';
import {  UserService, ShopService } from 'src/app/lib/services';
import { mergeMap, map, tap } from 'rxjs/operators';
import { GeneralService as LocalGeneralService } from '../lib/services/index';
import { GeneralService } from 'src/app/lib/services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { E } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  bc$: Observable<BC>;
  title : string = environment.siteName;
  loggedUser$: Observable<User>;
  isOpen: boolean = false;
  @Output() public sidenavToggle = new EventEmitter();
  messages: any;
  msgSubScr: Subscription;
  shop$ : Observable<Shop>;

  layOutXSmall$:Observable<BreakpointState>;
  loggedSubScrioption: Subscription;
  signOutSubscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private shopService: ShopService,
    public generalService: GeneralService,
    public localGeneralService: LocalGeneralService,
    public afAuth: AngularFireAuth,
    ) {

    }


    openOverlay(){
      if(this.isOpen){
        this.isOpen = !this.isOpen;
      }else{

        this.msgSubScr = this.shopService.shopMessages().subscribe(res=>{
          this.isOpen = true;
          this.messages = res;
        });
      }

    }

  ngOnInit(): void {

    this.bc$ = this.generalService.bc;
    this.layOutXSmall$ = this.breakpointObserver.observe([
      Breakpoints.XSmall
    ])



    // this.loggedUser$ = this.userService.getloggedUser.pipe(mergeMap(user=>{
    //   return this.shopService.shopDetail().pipe(map(res=>{
    //     return user;
    //   }))
    // }));

    this.loggedUser$ = this.userService.getloggedUser;
    this.shop$ = this.shopService.aShop;

    //this.loggedSubScrioption = this.userService.authUser().subscribe();

  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  signOut(){
    this.signOutSubscription = this.userService.setUserLogin({action:'SignOut'}).pipe(mergeMap(sRes=>{
      return this.userService.signOut().pipe(mergeMap(res=>{
        this.afAuth.signOut().then(gres=>{
          console.log(gres)
        })
        localStorage.removeItem('token');
        return this.userService.authUser();
      }))
    })).subscribe(res=>{


    }, err=>{
      this.router.navigate(['/']);
    });
  }
  ngOnDestroy(){
    this.loggedSubScrioption && this.loggedSubScrioption.unsubscribe();
    this.signOutSubscription && this.signOutSubscription.unsubscribe();
    this.msgSubScr && this.msgSubScr.unsubscribe();

  }
}
