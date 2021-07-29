import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTagSelectionComponent } from './product-tag-selection/product-tag-selection.component';

import { SharedModuleModule } from '../../../lib/shared-module/shared-module.module';
import { CreateProductTagComponent } from './create-product-tag/create-product-tag.component';

@NgModule({
  declarations: [ProductTagSelectionComponent, CreateProductTagComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ProductTagSelectionComponent
  ]
})
export class TagModule { }
