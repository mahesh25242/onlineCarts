import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService } from '../../lib/services';

@Component({
  selector: 'app-our-clients',
  templateUrl: './our-clients.component.html',
  styleUrls: ['./our-clients.component.scss']
})
export class OurClientsComponent implements OnInit {

  shops$: Observable<Shop[]>;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shops$ = this.shopService.allShops();
  }

}
