import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../lib/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import Notiflix from "notiflix";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DragDropModule} from '@angular/cdk/drag-drop';




import { ModalComponent } from './components/modal/modal.component';
import { ShopCategoriesComponent } from './components/shop-categories/shop-categories.component';
import { TermsAndCondtionBlockComponent } from './components/terms-and-condtion-block/terms-and-condtion-block.component';

Notiflix.Confirm.Init({ borderRadius:"5px",titleColor:"#204486",okButtonBackground:"#204486",cancelButtonBackground:"#e2e2e2",cancelButtonColor:"#393939", });
Notiflix.Notify.Init({ width:"390px", success: {background:"#d4edda",textColor:"#155724",}, failure: {background:"#f8d7da",textColor:"#721c24",}, warning: {background:"#fff3cd",textColor:"#856404",}, info: {background:"#cce5ff",textColor:"#004085",}, });
Notiflix.Report.Init({ svgSize:"80px",borderRadius:"5px",width:"390px", success: {svgColor:"#45c489",buttonBackground:"#204486",}, });
Notiflix.Loading.Init({ svgColor:"#204486", });
Notiflix.Block.Init({ svgColor:"#204486", });

@NgModule({
  declarations: [
    SafeHtmlPipe,
    ModalComponent,
    ShopCategoriesComponent,
    TermsAndCondtionBlockComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DragDropModule
  ],
  exports:[
    NgSelectModule,
    NgbModule,
    SafeHtmlPipe,
    ModalComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DragDropModule,
    ShopCategoriesComponent,
    TermsAndCondtionBlockComponent
  ]
})
export class SharedModuleModule { }
