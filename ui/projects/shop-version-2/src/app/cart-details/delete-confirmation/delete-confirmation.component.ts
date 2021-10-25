import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { GeneralService, ShopService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MobileContactComponent } from '../../contact-us/mobile-contact/mobile-contact.component';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  shop$: Observable<Shop & { isDemoSite?: boolean, whatsappUrl?: string}>;
  faWhatsapp = faWhatsapp;
  constructor(private generalService: GeneralService,
    private shopService: ShopService,
    private _bottomSheetRef: MatBottomSheetRef<MobileContactComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      //event.preventDefault();
    }

  ngOnInit(): void {
    console.log(this.data)

  }

}
