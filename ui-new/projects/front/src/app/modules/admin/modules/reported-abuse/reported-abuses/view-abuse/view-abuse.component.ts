import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportAbuse } from '../../interfaces';

@Component({
  selector: 'app-view-abuse',
  templateUrl: './view-abuse.component.html',
  styleUrls: ['./view-abuse.component.scss']
})
export class ViewAbuseComponent implements OnInit {  
  constructor(public dialogRef: MatDialogRef<ViewAbuseComponent>,
    @Inject(MAT_DIALOG_DATA) public ra: ReportAbuse) { }

  ngOnInit(): void {
  }

}
