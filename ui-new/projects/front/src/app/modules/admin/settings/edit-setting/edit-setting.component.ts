import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Setting } from '../../../../lib/interfaces';
import { SettingService } from '../../../../lib/services';
import { map, mergeMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  editForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,    
    private settingService: SettingService,
    public dialogRef: MatDialogRef<EditSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public setting: Setting,
    @Inject('NotiflixService') public notiflix: any,
    private _snackBar: MatSnackBar) { }

  get f(){
    return this.editForm.controls;
  }

  save(){
    this.notiflix.loading.standard();
    const postData = {
      id: this.setting.id,
      value : this.f?.['value'].value,
      description : this.f?.['description'].value
    };    
    this.settingService.saveSetting(postData).pipe(mergeMap(res=>{
      return this.settingService.getAllSettings().pipe(map(settings => res));
    })).subscribe({
      next: (res: any)=>{
        this._snackBar.open(res?.message, 'Close');
      },error: (err)=>{
        if(err.status === 422){
          for(let result in this.editForm.controls){
            if(err.error.errors[result]){
              this.editForm.controls[result].setErrors({ error: err.error.errors[result] });
            }else{
              this.editForm.controls[result].setErrors(null);
            }
          }
        }
        
      },
      complete: ()=>{
        this.dialogRef.close();
      }
    }).add(()=>{
      this.notiflix.loading.remove();
    });
  }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [this.setting.id, []],
      name: [this.setting.name, []],
      value: [this.setting.value, []],
      description: [this.setting.description, []],
    });

  }

}
