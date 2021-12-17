import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportAbuseType } from '../../interfaces';
import { ReportAbuseService } from '../../services';
import first from 'lodash/first';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-abuse-form',
  templateUrl: './abuse-form.component.html',
  styleUrls: ['./abuse-form.component.scss']
})
export class AbuseFormComponent implements OnInit {
  abuseTypes$!: Observable<ReportAbuseType[]>;
  name = new FormControl();
  comment = new FormControl();
  type = new FormControl();
  constructor(private reportAbuseService: ReportAbuseService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  send(){
    this.notiflix.loading.standard();
    const postData = {
      name: this.name.value,
      content: this.comment.value,
      report_abuse_type_id: (this.type.value) ? first(this.type.value) : 0,
      url: this.router.url,
      shop_product_id: this.data?.id
    }
    this.reportAbuseService.save(postData).subscribe({
      complete: () =>{
        this._snackBar.open(`Successfully changed `, 'Close');
      }
    }).add(() =>{
      this.notiflix.loading.remove();
    });
  }
  ngOnInit(): void {
    console.log(this.data)
    this.abuseTypes$ = this.reportAbuseService.abuseTypes();
  }

}
