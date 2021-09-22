import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbuseFormComponent } from './abuse-form/abuse-form.component';

@Component({
  selector: 'app-report-abuse',
  templateUrl: './report-abuse.component.html',
  styleUrls: ['./report-abuse.component.scss']
})
export class ReportAbuseComponent implements OnInit {
  @Input() item:any;
  constructor(public dialog: MatDialog) { }

  reportAnAbuse(){
    const dialogRef = this.dialog.open(AbuseFormComponent,{
      data: this.item
    });
  }
  ngOnInit(): void {

  }

}
