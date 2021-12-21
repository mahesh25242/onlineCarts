import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Shop } from '../../../lib/interfaces';
import { GeneralService, ShopService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-mobile-contact',
  templateUrl: './mobile-contact.component.html',
  styleUrls: ['./mobile-contact.component.scss']
})
export class MobileContactComponent implements OnInit {
  shop$!: Observable<Shop & { isDemoSite?: boolean, whatsappUrl?: string}>;
  
  icons: {  wa: IconDefinition} = { wa: faWhatsapp};  

  
  
  constructor(private generalService: GeneralService,
    private shopService: ShopService,
    private _bottomSheetRef: MatBottomSheetRef<MobileContactComponent>,
    private breakpointObserver: BreakpointObserver,) { }

    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      //event.preventDefault();
    }

  ngOnInit(): void {


    this.shop$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).pipe(mergeMap(bp=>{
      return this.shopService.aShop.pipe(map(res=>{
        const isDemoSite = (environment.shopKey == environment.demoShopKey);
        let whatsappUrl = null;

        if(bp.matches){
          whatsappUrl =  `https://api.whatsapp.com/send?phone=${res?.phone}&text=Hi`
        }else{
          whatsappUrl =  `https://web.whatsapp.com/send?phone=${res?.phone}&text=Hi`
        }
        res = {...res, ...{ isDemoSite: isDemoSite, whatsappUrl: whatsappUrl}}
        return res;
      }))
    }))
  }

}
