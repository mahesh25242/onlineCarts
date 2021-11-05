import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrefillMessage } from '../../interfaces';
import { PrefillMessageService } from '../../services';
import Notiflix from "notiflix";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sent-on-whatsapp',
  templateUrl: './sent-on-whatsapp.component.html',
  styleUrls: ['./sent-on-whatsapp.component.scss']
})
export class SentOnWhatsappComponent implements OnInit {
  @Input() pm: PrefillMessage;
  saveFrm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private prefillMessageService: PrefillMessageService,
    private breakpointObserver: BreakpointObserver,) { }


  get f(){ return this.saveFrm.controls}

  sent(){
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(res=>{
      let url:string = '';
      if(res.matches){
        url =  `https://api.whatsapp.com/send?phone=${this.f.mobile.value}&text=${this.pm.message}`
      }else{
        url =  `https://web.whatsapp.com/send?phone=${this.f.mobile.value}&text=${this.pm.message}`
      }

      window.open(
        url,
        '_blank' // <- This is what makes it open in a new window.
      );

      const postData = {
        phone: this.f.mobile.value,
        pm_id: this.pm.id
      };
      this.prefillMessageService.sentOnWhatsapp(postData).subscribe(res=>{
      });

      this.activeModal.close();
    })
  }

  ngOnInit(): void {
    this.saveFrm = this.formBuilder.group({
      mobile: ['+91', []]
    });
  }

}
