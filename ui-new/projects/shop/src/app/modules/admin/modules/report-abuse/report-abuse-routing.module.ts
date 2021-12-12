import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReportedAbusesComponent } from './my-reported-abuses/my-reported-abuses.component';

const routes: Routes = [
  {
    path: '',
    component: MyReportedAbusesComponent,    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportAbuseRoutingModule { }
