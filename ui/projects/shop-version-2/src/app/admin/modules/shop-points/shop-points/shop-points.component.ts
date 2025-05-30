import { Component, OnInit } from '@angular/core';
import { ShopPointsService } from '../services';
import { ShopPoint } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopService } from 'src/app/lib/services';
import { Shop } from 'src/app/lib/interfaces';
import Notiflix from "notiflix";

@Component({
  selector: 'mod-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit {
  shop$: Observable<Shop>;
  shopPoint$: Observable<ShopPoint>;
  orgin: string = window.location.origin;
  reCall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private shopPointsService: ShopPointsService,
    private shopService: ShopService,
    ) { }
    copied(){
      Notiflix.Notify.Success(`Successfully copied. `);
    }
  ngOnInit(): void {
    this.shop$ = this.shopService.aShop;
    this.shopPoint$ = this.reCall$.asObservable().pipe(mergeMap(res=>this.shopPointsService.points()));
  }

}
