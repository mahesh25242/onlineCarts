import { Component, Input, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { GeneralService } from '../../../lib/services';

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

          }, err=>{
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
