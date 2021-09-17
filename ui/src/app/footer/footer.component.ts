import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { SettingService } from '../lib/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData$: Observable<any>;
  faAngleDoubleRight = faAngleDoubleRight;
  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.footerData$ = this.settingService.footerData();
  }

}
