import { Component, OnInit } from '@angular/core';
import { ShopPointsService } from '../services';
import { ShopPoint } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'mod-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit {
  shopPoint$: Observable<ShopPoint>;
  reCall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private shopPointsService: ShopPointsService) { }

  ngOnInit(): void {
    this.shopPoint$ = this.reCall$.asObservable().pipe(mergeMap(res=>this.shopPointsService.points()));
  }

}
