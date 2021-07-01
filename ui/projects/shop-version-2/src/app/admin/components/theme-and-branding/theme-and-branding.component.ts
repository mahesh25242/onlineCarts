import { Component, Input, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { Shop, Theme } from 'src/app/lib/interfaces';
import { ShopService, ThemeService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-theme-and-branding',
  templateUrl: './theme-and-branding.component.html',
  styleUrls: ['./theme-and-branding.component.scss']
})
export class ThemeAndBrandingComponent implements OnInit {

  @Input() shop: Shop;
  theme_id: number;
  thems$: Observable<Theme[]>;
  favicon: string;
  logo: string;

  saveThemeSubscription: Subscription;
  constructor(private themeService: ThemeService,
    private shopService: ShopService,
    private imageCompress: NgxImageCompressService) { }

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

  handleImageSelection(type: string){

    this.imageCompress.uploadFile().then(({image, orientation}) => {
      //this.imgResultBeforeCompress = image;
//      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


      this.imageCompress.compressFile(image, -1).then(
        result => {
         // this.imgResultAfterCompress = result;

  //        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));

          if(type == 'logo'){
            this.logo = result;
          }else{
            this.favicon = result;
          }


          from(fetch(result)
          .then(res => res.blob())).pipe(mergeMap(res=>{
            const formData = new FormData();
            res && formData.append(type, res);
            return this.shopService.changeLogoFavicon(formData)
          })).subscribe(res=>{

          }, err=>{
            console.log(err)
          })




        }
      );

    });


  }

  ngOnInit(): void {
    this.favicon = this.shop.favicon;
    this.logo = this.shop.logo;
    this.theme_id = this.shop.shop_theme.theme_id;
    this.thems$ = this.themeService.themes();
  }

}
