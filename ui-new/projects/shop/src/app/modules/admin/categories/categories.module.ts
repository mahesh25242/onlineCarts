import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';



import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent    
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModuleModule    
  ]
})
export class CategoriesModule { }
