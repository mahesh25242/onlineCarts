import { Component, Inject, OnInit } from '@angular/core';
import { ShopPointsService } from '../services';
import { ShopPoint } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopService } from '../../../../../lib/services';
import { Shop } from '../../../../../lib/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'mod-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit {
  icons: { fb: IconDefinition, wa: IconDefinition} = {fb: faFacebook, wa: faWhatsapp};  

  
  shop$!: Observable<Shop | null>;
  shopPoint$!: Observable<ShopPoint>;
  orgin: string = window.location.origin;
  reCall$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  constructor(private shopPointsService: ShopPointsService,
    private shopService: ShopService,
    private _snackBar: MatSnackBar    
    ) { }
    copied(){
      this._snackBar.open(`Successfully copied `, 'Close');      
    }
  ngOnInit(): void {
    this.shop$ = this.shopService.aShop;
    this.shopPoint$ = this.reCall$.asObservable().pipe(mergeMap(res=>this.shopPointsService.points()));
  }

}
