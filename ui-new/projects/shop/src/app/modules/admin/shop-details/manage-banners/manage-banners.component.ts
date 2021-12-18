import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Shop } from '../../../../lib/interfaces';
import { GeneralService } from '../../../../lib/services';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.scss']
})
export class ManageBannersComponent implements OnInit {
  @Input() shop!: Shop;
  img$!: Observable<any[]>;
  constructor(
    private generalService: GeneralService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,
    @Inject('UploadImageService') public uploadImage: any) { }

  handleImageSelection(img: any, idx: number, event: Event) {
    this.notiflix.loading.standard();
    this.uploadImage.handleImageUpload(event).pipe(mergeMap((res: Blob)=>{
      const reader = new FileReader();      
      reader.onload = (e) =>  {
        img.url = e?.target?.result;        
      };      
      reader.readAsDataURL(res);
      const formData:any = new FormData();
      
      res && formData.append(`image`, res);
      res && formData.append(`idx`, `${idx}`);

      return this.generalService.saveBanner(formData)     
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
    const max_banner = this.shop?.max_banner ?? 0
    this.img$ = this.generalService.getAllBanners().pipe(map(res=>{
      let imgs: any[] = [];      
      for (let i=1; i<= max_banner ; i++){
        imgs = [...imgs, {image:  '', url:  (res[i-1] && res[i-1].image) ? res[i-1].image : ''}];
      }
      return imgs;
    }), catchError(err =>{
      let imgs: any[] = [];
      for (let i=1; i<= max_banner ; i++){
        imgs = [...imgs, {image:  '', url:   ''}];
      }
      return of(imgs);
    }))


  }

}
