import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-terms',
  templateUrl: './register-terms.component.html',
  styleUrls: ['./register-terms.component.scss']
})
export class RegisterTermsComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
