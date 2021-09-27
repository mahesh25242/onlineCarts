import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../../shared-module/shared-module.module';
import { PrefillMessagesComponent } from './prefill-messages/prefill-messages.component';
import { PrefillMessageRoutingModule } from './prefill-message-routing.module';
import { CreateNewComponent } from './prefill-messages/create-new/create-new.component';




@NgModule({
  declarations: [PrefillMessagesComponent, CreateNewComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    PrefillMessageRoutingModule

  ],
  providers:[

  ]
})
export class PrefillMessageModule { }
