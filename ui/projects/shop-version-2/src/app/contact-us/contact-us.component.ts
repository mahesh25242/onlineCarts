import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/lib/interfaces';
import { GeneralService, ShopService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  shop$: Observable<Shop>;
  constructor(private generalService: GeneralService,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Contact Us',
      url:'',
      backUrl: null
    });

    this.shop$ = this.shopService.aShop
  }

}
