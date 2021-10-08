import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopService } from 'src/app/lib/services';

@Component({
  selector: 'app-shop-pop-up-notifications',
  templateUrl: './shop-pop-up-notifications.component.html',
  styleUrls: ['./shop-pop-up-notifications.component.scss']
})
export class ShopPopUpNotificationsComponent implements OnInit {
  @Input() messages:any;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

  }

}
