import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { empty, Observable, of, Subscription } from 'rxjs';
import { catchError, first, map, mergeMap, take, tap } from 'rxjs/operators';
import { City, Country, ShopCategory, State } from 'src/app/lib/interfaces';
import { CityService, CountryService,
  ShopCategoryService, StateService, ShopService, UserService } from 'src/app/lib/services';
  import { AngularFireAuth } from "@angular/fire/auth";
import { first as _First} from 'lodash';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user$: Observable<User>;
  FullName: string = '';
  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth) {}





  ngOnInit(): void {




    this.user$ = this.afAuth.authState.pipe(tap(res=>{
      this.FullName = res?.displayName;
    }));



  }

}
