import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Package } from '../../../../lib/interfaces';
import { PackageService } from '../../../../lib/services';
import { map, mergeMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {  
  pkgFrm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    public dialogRef: MatDialogRef<EditPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public pkg: Package,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,) { }

  get f(){
    return this.pkgFrm.controls;
  }
  save(){
    this.notiflix.loading.standard();
    const postData = {
      id: this.f?.['id'].value ?? 0,
      name: this.f?.['name'].value,
      description: this.f?.['description'].value,
      price: this.f?.['price'].value,
      duration: this.f?.['duration'].value,
      status: this.f?.['status'].value,
      plan_id: this.f?.['plan_id'].value,
    };
    this.packageService.save(postData).pipe(mergeMap((res) =>{
      return this.packageService.listAllPackages().pipe(map(pkgs => res));
    })).subscribe(
      {
        next: (res: any) => {          
          this._snackBar.open(res?.message, 'Close');
          this.dialogRef.close();
        },
        error: (err) => {
          if(err.status === 422){
            for(let result in this.pkgFrm.controls){
              if(err.error.errors[result]){
                this.pkgFrm.controls[result].setErrors({ error: err.error.errors[result] });
              }else{
                this.pkgFrm.controls[result].setErrors(null);
              }
            }
          }
        },
        complete: () => {
          
        }
      }
    ).add(() => {
      this.notiflix.loading.remove();
    });
  }
  ngOnInit(): void {
    this.pkgFrm = this.formBuilder.group({
      id: [this.pkg?.id, []],
      name: [this.pkg?.name, []],
      description: [this.pkg?.description, []],
      price: [this.pkg?.price, []],
      duration: [this.pkg?.duration, []],
      status: [this.pkg?.status ?? 1, []],
      plan_id: [this.pkg?.plan_id ?? '', []],
    });
  }

}
