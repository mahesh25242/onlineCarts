import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Setting } from 'src/app/lib/interfaces';
import { SettingService } from '../../../lib/services';
import { EditSettingComponent } from './edit-setting/edit-setting.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings$: Observable<Setting[]>
  constructor(private settingService: SettingService,
    private _modalService: NgbModal,) { }

  edit(setting: Setting){
    const activeModal = this._modalService.open(EditSettingComponent);
    activeModal.componentInstance.setting = setting;
  }

  ngOnInit(): void {
    this.settings$ = this.settingService.settings;
  }

}
