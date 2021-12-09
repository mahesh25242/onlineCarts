import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Setting } from '../../../../lib/interfaces';
import { SettingService } from '../../../../lib/services';
import { mergeMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public setting: Setting) { }

  get f(){
    return this.editForm.controls;
  }

  save(){
    const postData = {
      id: this.setting.id,
      value : this.f?.['value'].value,
      description : this.f?.['description'].value
    };    
    this.settingService.saveSetting(postData).pipe(mergeMap(res=>{
      return this.settingService.getAllSettings();
    })).subscribe({
      next: (res)=>{
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
        
      }
    });
  }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      value: [this.setting.value, []],
      description: [this.setting.description, []],
    });

  }

}
