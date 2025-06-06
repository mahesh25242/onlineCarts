import { Component, Input, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { GeneralService } from '../../../lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.scss']
})
export class ManageBannersComponent implements OnInit {
  @Input() shop: Shop;
  img$: Observable<any[]>;
  constructor(private imageCompress: NgxImageCompressService,
    private generalService: GeneralService,) { }

  handleImageSelection(img: any, idx: number){


    this.imageCompress.uploadFile().then(({image, orientation}) => {
      Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.upload-banner-btn-${idx}`);
      //this.imgResultBeforeCompress = image;
//      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


      this.imageCompress.compressFile(image, -1).then(
        result => {
         // this.imgResultAfterCompress = result;

  //        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));


          img.url = result

          from(fetch(result)
          .then(res => res.blob())).pipe(mergeMap(res=>{
            const formData = new FormData();
            res && formData.append(`image`, res);
            res && formData.append(`idx`, `${idx}`);
            return this.generalService.saveBanner(formData)
          })).subscribe(res=>{
            Notiflix.Notify.Success(`Successfully uploaded `);
            Notiflix.Block.Remove(`.upload-banner-btn-${idx}`);
          }, err=>{
            Notiflix.Notify.Failure(`Sorry unexpected error occur `);
            Notiflix.Block.Remove(`.upload-banner-btn-${idx}`);
            console.log(err)
          })




        }
      );

    });
  }
  ngOnInit(): void {
    this.img$ = this.generalService.getAllBanners().pipe(map(res=>{
      let imgs: any[] = [];
      for (let i=1; i<= this.shop.max_banner ; i++){
        imgs = [...imgs, {image:  '', url:  (res[i-1] && res[i-1].image) ? res[i-1].image : ''}];
      }
      return imgs;
    }), catchError(err =>{
      let imgs: any[] = [];
      for (let i=1; i<= this.shop.max_banner ; i++){
        imgs = [...imgs, {image:  '', url:   ''}];
      }
      return of(imgs);
    }))


  }

}
