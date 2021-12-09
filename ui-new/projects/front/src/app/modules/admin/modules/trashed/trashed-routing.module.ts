import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrashShopsResolver } from './trash-shops/trash-shops-resolver';
import { TrashShopsComponent } from './trash-shops/trash-shops.component';
import { TrashedComponent } from './trashed.component';


const routes: Routes = [
  {
    path: '',
    component: TrashedComponent,
    children:[
      {
        path:'',
        component: TrashShopsComponent,
        resolve:{
          shops: TrashShopsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrashedRoutingModule { }
