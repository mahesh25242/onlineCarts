import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Setting } from '../../../lib/interfaces';
import { SettingService } from '../../../lib/services';
import { EditSettingComponent } from './edit-setting/edit-setting.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings$!: Observable<Setting[] | null>;
  displayedColumns: string[] = ['no', 'name', 'value', 'description'];


  constructor(private settingService: SettingService,
    private dialog: MatDialog,) { }

  edit(setting: Setting){
    const activeModal = this.dialog.open(EditSettingComponent,{
      data: setting
    });    
  }

  ngOnInit(): void {
    this.settings$ = this.settingService.settings;
  }

}
