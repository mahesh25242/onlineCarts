import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrefillMessage } from '../../interfaces';
import { PrefillMessageService } from '../../services';
import Notiflix from "notiflix";

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
    private prefillMessageService: PrefillMessageService) { }


  get f(){ return this.saveFrm.controls}
  ngOnInit(): void {
    this.saveFrm = this.formBuilder.group({
      mobile: [null, []]
    });
  }

}
