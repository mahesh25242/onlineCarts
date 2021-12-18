import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesResolver } from './categories-resolver';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent, resolve: { categories: CategoriesResolver} },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    CategoriesResolver   
  ]
})
export class CategoriesRoutingModule { }
