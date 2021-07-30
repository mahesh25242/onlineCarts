import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTagSelectionComponent } from './product-tag-selection/product-tag-selection.component';

import { SharedModuleModule } from '../../../lib/shared-module/shared-module.module';
import { CreateProductTagComponent } from './create-product-tag/create-product-tag.component';
import { ProductTagChipComponent } from './product-tag-chip/product-tag-chip.component';

@NgModule({
  declarations: [ProductTagSelectionComponent, CreateProductTagComponent, ProductTagChipComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ProductTagSelectionComponent,
    ProductTagChipComponent
  ]
})
export class TagModule { }
