import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrefillMessagesComponent } from './prefill-messages/prefill-messages.component';

const routes: Routes = [
  {
    path: '',
    component: PrefillMessagesComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefillMessageRoutingModule { }
