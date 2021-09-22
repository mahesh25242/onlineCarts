import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportAbuseType } from '../../interfaces';
import { ReportAbuseService } from '../../services';
import Notiflix from "notiflix";
import { first } from 'lodash';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abuse-form',
  templateUrl: './abuse-form.component.html',
  styleUrls: ['./abuse-form.component.scss']
})
export class AbuseFormComponent implements OnInit {
  abuseTypes$: Observable<ReportAbuseType[]>;
  name = new FormControl();
  comment = new FormControl();
  type = new FormControl();
  constructor(private reportAbuseService: ReportAbuseService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  send(){
    Notiflix.Loading.Pulse();
    const postData = {
      name: this.name.value,
      content: this.comment.value,
      report_abuse_type_id: (this.type.value) ? first(this.type.value) : 0,
      url: this.router.url,
      shop_product_id: this.data?.id
    }
    this.reportAbuseService.save(postData).subscribe(res =>{
      Notiflix.Notify.Success(`Successfully reported `);
    }, error=>{
      console.log(error.error);
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {
    console.log(this.data)
    this.abuseTypes$ = this.reportAbuseService.abuseTypes();
  }

}
