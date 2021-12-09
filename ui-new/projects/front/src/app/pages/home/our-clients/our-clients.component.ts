import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from '../../../lib/interfaces';
import { ShopService } from '../../../lib/services';

@Component({
  selector: 'app-our-clients',
  templateUrl: './our-clients.component.html',
  styleUrls: ['./our-clients.component.scss']
})
export class OurClientsComponent implements OnInit {

  shops$: Observable<Shop[]> | undefined;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shops$ = this.shopService.ourClients();
  }

}
