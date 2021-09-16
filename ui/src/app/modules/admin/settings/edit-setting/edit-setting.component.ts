import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Setting } from 'src/app/lib/interfaces';
import { SettingService } from '../../../../lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  editForm: FormGroup;
  @Input() setting: Setting;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private settingService: SettingService) { }

  get f(){
    return this.editForm.controls;
  }

  save(){
    const postData = {
      id: this.setting.id,
      value : this.f.value.value
    };
    Notiflix.Loading.Circle();
    this.settingService.saveSetting(postData).pipe(mergeMap(res=>{
      return this.settingService.getAllSettings();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully updated `);
      this.modal.close();
    }, error=>{
      for(let result in this.editForm.controls){
        if(error.error.errors[result]){
          this.editForm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.editForm.controls[result].setErrors(null);
        }
      }
      Notiflix.Loading.Remove();
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      value: [this.setting.value, []]
    });

  }

}
