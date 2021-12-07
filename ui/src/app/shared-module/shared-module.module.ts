import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../lib/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import Notiflix from "notiflix";


import {DragDropModule} from '@angular/cdk/drag-drop';


import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    NgSelectModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DragDropModule,
    FlexLayoutModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ScrollingModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatProgressBarModule,
    ClipboardModule,
    MatToolbarModule,
    MatStepperModule
  ],
  exports:[
    NgSelectModule,    
    SafeHtmlPipe,
    ModalComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DragDropModule,
    FlexLayoutModule,
    
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ScrollingModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatProgressBarModule,
    ClipboardModule,
    MatToolbarModule,
    MatStepperModule,

    ShopCategoriesComponent,
    TermsAndCondtionBlockComponent
  ]
})
export class SharedModuleModule { }
