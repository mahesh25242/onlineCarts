import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { CategoriesResolver } from './categories-resolver';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent, canActivate: [AdminAuthGuard], resolve: { categories: CategoriesResolver} },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    CategoriesResolver   
  ]
})
export class CategoriesRoutingModule { }
