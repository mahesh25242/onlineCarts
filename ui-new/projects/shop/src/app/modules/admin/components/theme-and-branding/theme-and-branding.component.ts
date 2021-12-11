import { Component, Inject, Input, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { Shop, Theme } from '../../../../lib/interfaces';
import { ShopService, ThemeService } from '../../../../lib/services';
import { mergeMap, tap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-theme-and-branding',
  templateUrl: './theme-and-branding.component.html',
  styleUrls: ['./theme-and-branding.component.scss']
})
export class ThemeAndBrandingComponent implements OnInit {

  @Input() shop!: Shop;
  theme_id!: number;
  thems$!: Observable<Theme[]>;
  favicon!: string;
  logo!: string;

  saveThemeSubscription!: Subscription;
  constructor(private themeService: ThemeService,
    private shopService: ShopService,
    private imageCompress: NgxImageCompressService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  chooseTheme(){
    this.notiflix.loading.standard();    
    this.themeService.saveTheme(this.theme_id).pipe(mergeMap(res=>{
      return this.shopService.shopDetail().pipe(tap(res=>{
        document.body.className = `mat-typography ${res?.shop_theme?.theme?.class}`;
      }));
    })).subscribe({
      complete: () =>  this._snackBar.open(`Successfully saved theme `, 'Close')
    }).add(() =>{
      this.notiflix.loading.remove();
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
            return this.shopService.changeLogoFavicon(formData).pipe(mergeMap(res=>{
              return this.shopService.shopDetail();
            }))
          })).subscribe(res=>{

          }, err=>{
            console.log(err)
          })




        }
      );

    });


  }

  ngOnInit(): void {
    this.favicon = this.shop.favicon ?? '';
    this.logo = this.shop.logo ?? '';
    this.theme_id = this.shop?.shop_theme?.theme_id ?? 0;
    this.thems$ = this.themeService.themes();
  }

}
