import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';
import { GeneralService } from '../lib/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  orgin: string = window.location.origin;
  environment = environment;
  isAdmin$: Observable<boolean>;
  currentYear: number = new Date().getFullYear();
  shop$: Observable<Shop>;

  constructor(private generalService: GeneralService,
    private shopService: ShopService,) { }

  ngOnInit(): void {
    this.shop$ = this.shopService.aShop;
    this.isAdmin$ = this.generalService.isAdmin$.asObservable()

  }

}
