import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrefillMessage } from '../../interfaces';
import { PrefillMessageService } from '../../services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  @Input() ra: PrefillMessage;
  saveFrm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private prefillMessageService: PrefillMessageService) { }

  save(){
    Notiflix.Loading.Pulse();
    const postData = {
      id: (this.f.id.value) ? this.f.id.value : 0,
      name: this.f.name.value,
      subject: this.f.subject.value,
      message: this.f.message.value,
    };

    this.prefillMessageService.save(postData).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully updated `);
      this.activeModal.close(true);
    }, error=>{
      console.log(error)
      for(let result in this.saveFrm.controls){
        if(error.error.errors[result]){
          this.saveFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.saveFrm.controls[result].setErrors(null);
        }
      }

    }).add(() =>{
      Notiflix.Loading.Remove();
    })
  }

  get f(){ return this.saveFrm.controls}
  ngOnInit(): void {
    this.saveFrm = this.formBuilder.group({
      id: [this.ra?.id, []],
      name: [this.ra?.name, []],
      subject: [this.ra?.subject, []],
      message: [this.ra?.message, []],
      is_default: [this.ra?.is_default, []],
    });
  }

}
