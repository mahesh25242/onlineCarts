import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/lib/interfaces';
import { UserService } from 'src/app/lib/services';

@Component({
  selector: 'app-admin-side-nav-list',
  templateUrl: './admin-side-nav-list.component.html',
  styleUrls: ['./admin-side-nav-list.component.scss']
})
export class AdminSideNavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter();
  loggedUser$: Observable<User>;
  signOutSubscription: Subscription;

  constructor(private userService: UserService,
    private router: Router,
    public afAuth: AngularFireAuth) { }

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

      this.router.navigate(['./']);
    }).add(() => this.onSidenavClose());
  }

  ngOnInit() {
    // this.loggedUser$ = this.userService.getloggedUser.pipe(mergeMap(user=>{
    //   return this.shopService.shopDetail().pipe(map(res=>{
    //     return user;
    //   }))
    // }));

    this.loggedUser$ = this.userService.getloggedUser;
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
