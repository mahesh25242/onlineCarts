import { Component, Inject, Input, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { Shop, Theme } from '../../../../lib/interfaces';
import { ShopService, ThemeService } from '../../../../lib/services';
import { mergeMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-theme-and-branding',
  templateUrl: './theme-and-branding.component.html',
  styleUrls: ['./theme-and-branding.component.scss']
})
export class ThemeAndBrandingComponent implements OnInit {

  @Input() shop!: Shop;
  theme_id!: number;
  thems$!: Observable<Theme[]>;
  favicon!: string | ArrayBuffer | null | undefined;
  logo!: string | ArrayBuffer | null | undefined;

  saveThemeSubscription!: Subscription;
  constructor(private themeService: ThemeService,
    private shopService: ShopService,    
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,
    @Inject('UploadImageService') public uploadImage: any,
    private meta: Meta) { }

  chooseTheme(){
    this.notiflix.loading.standard();    
    this.themeService.saveTheme(this.theme_id).pipe(mergeMap(res=>{
      return this.shopService.shopDetail().pipe(tap(res=>{
        if(res?.bg_color){
          this.meta.updateTag({ 
              name: 'theme-color',
              content: res?.bg_color
          });
        }
        
 
        // document.body.className = `mat-typography ${res?.shop_theme?.theme?.class}`;
      }));
    })).subscribe({
      complete: () =>  this._snackBar.open(`Successfully saved theme `, 'Close')
    }).add(() =>{
      this.notiflix.loading.remove();
    })
  }

  handleImageSelection(type: string, event: Event){
    console.log(type)
    this.uploadImage.handleImageUpload(event).pipe(mergeMap((res: Blob)=>{
      const reader = new FileReader();      
      reader.onload = (e) =>  {
        switch(type){
          case 'favicon':
            this.favicon = reader.result;
          break;
          case 'logo':
            this.logo = reader.result;
          break;
        }          
      };      
      reader.readAsDataURL(res);
      const formData:any = new FormData();
      
      res && formData.append(type, res);

      return this.shopService.changeLogoFavicon(formData).pipe(mergeMap(res=>{
        return this.shopService.shopDetail();
      }))
    })).subscribe({
      complete: () => this._snackBar.open(`Successfully uploaded `, 'Close'),
      error: (err: Error) => {        
        this._snackBar.open(`Error while uploading`, 'Close')
      }
    }).add(() => {
      this.notiflix.loading.remove();
    });  


  }

  ngOnInit(): void {
    this.favicon = this.shop.favicon ?? '';
    this.logo = this.shop.logo ?? '';
    this.theme_id = this.shop?.shop_theme?.theme_id ?? 0;
    this.thems$ = this.themeService.themes();
  }

}
