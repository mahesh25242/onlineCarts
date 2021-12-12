import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { UserService } from '../services';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.authUser().pipe(
        take(1),
        map((user) => {

          if (user) {
            this.router.navigate(['/admin/home']);
            return false;
          }
          return true;
        }),
        catchError((err: Response) => {
          return of(true);
       })
      );
  }

}
