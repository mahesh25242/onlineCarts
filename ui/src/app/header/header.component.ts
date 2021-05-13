import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../lib/services';
import { Subscription, Observable } from 'rxjs';
import { User } from '../lib/interfaces';

import * as _ from 'lodash';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedSubScrioption: Subscription;
  signOutSubscription: Subscription;
  loggedUser$: Observable<User>;
  isNavbarCollapsed:boolean = true;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.loggedSubScrioption = this.userService.authUser().subscribe(res=>{
      //_.find(res.role, (rl) => console.log(rl)); //check loaddash is working
    });
  }



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

  ngOnDestroy(){
    if(this.loggedSubScrioption){
      this.loggedSubScrioption.unsubscribe();
    }

    if(this.signOutSubscription){
      this.signOutSubscription.unsubscribe();
    }
  }
}
