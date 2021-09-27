import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportedAbusesComponent } from './reported-abuses/reported-abuses.component';

const routes: Routes = [
  {
    path: '',
    component: ReportedAbusesComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportedAbuseRoutingModule { }
