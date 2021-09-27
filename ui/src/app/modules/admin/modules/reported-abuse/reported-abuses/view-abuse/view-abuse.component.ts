import { Component, Input, OnInit } from '@angular/core';
import { ReportAbuse } from '../../interfaces';

@Component({
  selector: 'app-view-abuse',
  templateUrl: './view-abuse.component.html',
  styleUrls: ['./view-abuse.component.scss']
})
export class ViewAbuseComponent implements OnInit {
  @Input() ra: ReportAbuse;
  constructor() { }

  ngOnInit(): void {
  }

}
