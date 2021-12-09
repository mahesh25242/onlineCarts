import { Component, OnInit, OnDestroy } from '@angular/core';

import { SettingService, UserService } from '../../lib/services';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../lib/interfaces';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedSubScrioption: Subscription | undefined;
  signOutSubscription: Subscription | undefined;
  loggedUser$: Observable<User | null> | undefined;
  isNavbarCollapsed:boolean = true;
  footerData$: Observable<any> | undefined;
  constructor(private userService: UserService,
    private router: Router,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.loggedSubScrioption = this.userService.authUser().subscribe((res: any)=>{
      //_.find(res.role, (rl) => console.log(rl)); //check loaddash is working
    });

    this.footerData$ = this.settingService.footerData();
  }



  signOut(){
    this.signOutSubscription = this.userService.setUserLogin({action:'SignOut'}).pipe(mergeMap(sRes=>{
      return this.userService.signOut().pipe(mergeMap(res=>{
        localStorage.removeItem('token');
        return this.userService.authUser();
      }))
    })).subscribe((res: any)=>{

    }, (err: any)=>{
      this.router.navigate(['/']);
    });

  }

  ngOnDestroy(){
    if(this.loggedSubScrioption){
      this.loggedSubScrioption.unsubscribe();
    }

    if(this.signOutSubscription){
      this.signOutSubscription.unsubscribe();
    }
  }
}
