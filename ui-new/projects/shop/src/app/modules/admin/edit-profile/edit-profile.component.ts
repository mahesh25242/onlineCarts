import { Component, Inject, OnInit } from '@angular/core';
import { GeneralService, UserService } from '../../../lib/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../../lib/interfaces';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  loggedUser$!: Observable<User | null>;
  editProfileFrm!: FormGroup;


  changePassCheckSubScr!: Subscription;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private generalService: GeneralService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

    get f() { return this.editProfileFrm.controls; }
  ngOnInit(): void {

    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Edit My Profile',
      url:'',
      backUrl: ''
    });

    this.editProfileFrm = this.formBuilder.group({
      fname: [null, [ Validators.required]],
      lname:[null, []],
      email: [{value: null, disabled: true}, [Validators.required]],
      phone: [{ value: null, disabled: true}, [Validators.required]],
      password: [{ value: null, disabled: true}, [Validators.required]],
      password_confirmation: [{ value: null, disabled: true}, [Validators.required]],
      isChanegPassword: [false, []]
    });



    this.changePassCheckSubScr = this.f?.['isChanegPassword'].valueChanges.subscribe(res=>{
      if(res){
        this.f?.['password'].enable();
        this.f?.['password_confirmation'].enable();
      }else{
        this.f?.['password'].disable();
        this.f?.['password_confirmation'].disable();
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

  // onFileInput(files: FileList){
  //   this.notiflix.loading.standard();

  //   const formData:any = new FormData();
  //   formData.append('avatharImg', files.item(0));
  //   //avatar-img
  //   this.userService.updateAvatar(formData).pipe(mergeMap(()=>{
  //     return this.userService.authUser();
  //   })).subscribe({
  //     complete: () =>{
  //       this._snackBar.open(`Successfully changed `, 'Close');
  //     }
  //   }).add(() => this.notiflix.loading.remove());
  // }
  updateProfile(){
    if(environment.demoShopKey == environment.shopKey){
      this._snackBar.open(`Sorry demo site can't be changed `, 'Close');      
      throw 'demo site';
    }
    this.notiflix.loading.standard();

    const postData = {
      fname: this.f?.['fname'].value,
      lname: this.f?.['lname'].value,
      email:  this.f?.['email'].value,
      password: null,
      password_confirmation: null,
      isChanegPassword:false
    }
    if(this.f?.['isChanegPassword'].value){
      postData.password = this.f?.['password'].value;
      postData.password_confirmation = this.f?.['password_confirmation'].value;
      postData.isChanegPassword =true;
    }
    this.userService.updateProfile(postData).pipe(mergeMap(res=>{
      return this.userService.authUser().pipe(map(()=> res));
    })).subscribe({
      complete: () =>{
        this._snackBar.open(`Successfully updated `, 'Close'); 
        this.editProfileFrm.patchValue({
          isChanegPassword: false,
          password: null,
          password_confirmation: null
        });    
      },
      error:(error) =>{
        if(error.status == 422){
          for(let result in this.editProfileFrm.controls){
            if(error.error.errors[result]){
              this.editProfileFrm.controls[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.editProfileFrm.controls[result].setErrors(null);
            }
          }
        }        
      }
    }).add(() => this.notiflix.loading.remove());
      
  }
  ngOnDestroy(){
    if(this.changePassCheckSubScr){
      this.changePassCheckSubScr.unsubscribe();
    }

  }

}
