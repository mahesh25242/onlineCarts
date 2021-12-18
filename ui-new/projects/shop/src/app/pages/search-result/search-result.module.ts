import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { SearchResultComponent } from './search-result.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { PageComponentsModule } from '../components/page.components.module';
import { ShopSharedModule } from '@shop/app/modules/admin/modules/shared-shop/shared-shop.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [
    SearchResultComponent,   
    SearchFilterComponent 
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    SharedModuleModule,   
    PageComponentsModule ,
    ShopSharedModule,
    NgxSliderModule
  ]
})
export class SearchResultModule { }
