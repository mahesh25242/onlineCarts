import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingService } from '../../lib/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData$: Observable<any> | undefined;  
  currentYear: number = new Date().getFullYear();
  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.footerData$ = this.settingService.footerData();
  }

}
