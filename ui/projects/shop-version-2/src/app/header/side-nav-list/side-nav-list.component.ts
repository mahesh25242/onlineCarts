import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/lib/interfaces';
import { CmsService, ShopService, UserService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter();
  loggedUser$: Observable<User>;
  signOutSubscription: Subscription;
  isDemoSite: boolean = false;
  pages$: Observable<any>= null;

  constructor(private userService: UserService,
    private router: Router,
    private shopService: ShopService,
    private cmsService: CmsService) { }

  signOut(){
    this.signOutSubscription = this.userService.setUserLogin({action:'SignOut'}).pipe(mergeMap(sRes=>{
      return this.userService.signOut().pipe(mergeMap(res=>{
        localStorage.removeItem('token');
        return this.userService.authUser();
      }))
    })).subscribe(res=>{

    }, err=>{
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.loggedUser$ = this.userService.getloggedUser;
    this.pages$ = this.cmsService.getPages;

    this.isDemoSite = (environment.shopKey == environment.demoShopKey);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ngOnDestroy(){
    if(this.signOutSubscription){
      this.signOutSubscription.unsubscribe();
    }
  }
}
