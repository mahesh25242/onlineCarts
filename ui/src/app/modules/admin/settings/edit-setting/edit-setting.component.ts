import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Setting } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  editForm: FormGroup;
  @Input() setting: Setting;
  constructor(private formBuilder: FormBuilder) { }

  get f(){
    return this.editForm.controls;
  }

  save(){

  }
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      value: [this.setting.value, []]
    });

  }

}
