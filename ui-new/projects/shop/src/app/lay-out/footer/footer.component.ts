import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from '../../lib/interfaces';
import { ShopService, GeneralService } from '../../lib/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  orgin: string = window.location.origin;
  environment = environment;
  isAdmin$!: Observable<boolean | null>;
  currentYear: number = new Date().getFullYear();
  shop$!: Observable<Shop | null>;

  constructor(private generalService: GeneralService,
    private shopService: ShopService,) { }

  ngOnInit(): void {
    this.shop$ = this.shopService.aShop;
    this.isAdmin$ = this.generalService.isAdmin$.asObservable()

  }

}
