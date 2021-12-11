import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Package } from '../../../../lib/interfaces';
import { SettingService } from '../../../../lib/services';

@Component({
  selector: 'app-choose-package',
  templateUrl: './choose-package.component.html',
  styleUrls: ['./choose-package.component.scss']
})
export class ChoosePackageComponent implements OnInit {
  paymentData$!: Observable<any>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Package,
  public dialogRef: MatDialogRef<ChoosePackageComponent>,
  private settingService: SettingService) { }

  ngOnInit(): void {
    this.paymentData$ = this.settingService.paymentData();
  }

}
