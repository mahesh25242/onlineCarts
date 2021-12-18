import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageComponent } from './cms-page.component';

const routes: Routes = [{ path: '', component: CmsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPageRoutingModule { }
