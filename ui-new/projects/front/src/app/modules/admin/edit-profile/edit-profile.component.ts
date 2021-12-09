import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService, StateService, CityService, UserService } from '../../../lib/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Country, State, City, User } from '../../../lib/interfaces';
import { Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  loggedUser$!: Observable<User | null>;
  editProfileFrm!: FormGroup;
  countries$!:Observable<Country[]>;
  states$!:Observable<State[]>;
  cities$!:Observable<City[]>;
  qr: string | null = null;


  countrySubscription: Subscription | undefined;
  stateSubscription: Subscription | undefined;
  changePassCheckSubScr: Subscription | undefined;
  constructor(private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

    get f() { return this.editProfileFrm.controls; }
  ngOnInit(): void {


    



    this.editProfileFrm = this.formBuilder.group({
      fname: [null, [ Validators.required]],
      lname:[null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [{ value: null, disabled: true}, [Validators.required]],
      address: [null, [Validators.required]],
      password: [{ value: null, disabled: true}, [Validators.required]],
      password_confirmation: [{ value: null, disabled: true}, [Validators.required]],
      country_id: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      pin: [null, [Validators.required]],
      isChanegPassword: [false, []]
    });

    this.countries$ = this.countryService.countries();

    this.states$ = this.f['country_id'].valueChanges.pipe(switchMap(res=>{
      return this.stateService.states(res.id)
    }));

    this.cities$ = this.f['state_id'].valueChanges.pipe(switchMap(res=>{
      return this.cityService.cities(res.id);
    }));

      

    this.changePassCheckSubScr = this.f['isChanegPassword'].valueChanges.subscribe(res=>{
      if(res){
        this.f['password'].enable();
        this.f['password_confirmation'].enable();
      }else{
        this.f['password'].disable();
        this.f['password_confirmation'].disable();
      }

    })

    this.loggedUser$ = this.userService.getloggedUser.pipe(map(res=>{
      this.editProfileFrm.patchValue({
        fname: res?.fname,
        lname: res?.lname,
        phone: res?.phone,
        email: res?.email,
      });
      return res;
    }));
  }

  onFileInput(event: Event){ 
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const formData:any = new FormData();
    formData.append('avatharImg', file);
    //avatar-img
    this.userService.updateAvatar(formData).pipe(mergeMap(res=>{
      return this.userService.authUser();
    })).subscribe({
      next: () => {

      },
      error: () => {
      },
      complete: () => {
      }
    });
  }
  updateProfile(){    
    const postData = {
      fname: this.f['fname'].value,
      lname: this.f['lname'].value,
      email:  this.f['email'].value,
      address: this.f['address'].value,
      password: null,
      password_confirmation: null,
      country_id: this.f['country_id'].value,
      state_id: this.f['state_id'].value,
      city_id: this.f['city_id'].value,
      pin: this.f['pin'].value,
      isChanegPassword:false
    }
    if(this.f['isChanegPassword'].value){
      postData.password = this.f['password'].value;
      postData.password_confirmation = this.f['password_confirmation'].value;
      postData.isChanegPassword =true;
    }
    this.userService.updateProfile(postData).pipe(mergeMap(res=>{
      return this.userService.authUser().pipe(map(user=> res));
    })).subscribe({
      next: () => {
        this.editProfileFrm.patchValue({
          isChanegPassword: false,
          password: null,
          password_confirmation: null
        });
        this._snackBar.open(`Successfully Updated`, 'Close');

      },
      error: (error) => {
        if(error.status === 422){
          for(let result in this.editProfileFrm.controls){
            if(error.error.errors[result]){
              this.editProfileFrm.controls[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.editProfileFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    });
   

  }
  ngOnDestroy(){
    if(this.changePassCheckSubScr){
      this.changePassCheckSubScr.unsubscribe();
    }
    if(this.stateSubscription){
      this.stateSubscription.unsubscribe();
    }
    if(this.countrySubscription){
      this.countrySubscription.unsubscribe();
    }
  }
}
