import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Shop, Theme } from 'src/app/lib/interfaces';
import { ShopService, ThemeService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-theme-and-branding',
  templateUrl: './theme-and-branding.component.html',
  styleUrls: ['./theme-and-branding.component.scss']
})
export class ThemeAndBrandingComponent implements OnInit {

  @Input() shop: Shop;
  theme_id: number;
  thems$: Observable<Theme[]>;

  saveThemeSubscription: Subscription;
  constructor(private themeService: ThemeService,
    private shopService: ShopService) { }

  chooseTheme(){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`mat-form-field`);
    this.saveThemeSubscription =  this.themeService.saveTheme(this.theme_id).pipe(mergeMap(res=>{
      return this.shopService.shopDetail();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved the theme `);
      Notiflix.Block.Remove(`mat-form-field`);
    }, err=>{
      Notiflix.Notify.Failure(`Sorry unexpected error occur `);
      Notiflix.Block.Remove(`mat-form-field`);
    })
  }

  handleImageSelection(){

  }

  ngOnInit(): void {
    this.theme_id = this.shop.shop_theme.theme_id;
    this.thems$ = this.themeService.themes();
  }

}
