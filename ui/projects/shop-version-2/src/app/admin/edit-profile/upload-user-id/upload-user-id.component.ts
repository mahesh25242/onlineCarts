import { Component, OnInit } from '@angular/core';
import Notiflix from "notiflix";
import { mergeMap, tap } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable } from 'rxjs';
import { UserService } from 'src/app/lib/services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-user-id',
  templateUrl: './upload-user-id.component.html',
  styleUrls: ['./upload-user-id.component.scss']
})
export class UploadUserIdComponent implements OnInit {
  idProofType:FormControl = new FormControl('');
  id:FormControl = new FormControl(0);
  status:FormControl = new FormControl(0);
  idProof: string;
  idProofTypes$: Observable<[{name?: string}]>;
  constructor(private imageCompress: NgxImageCompressService,
    private userService: UserService) { }

  handleImageSelection(){

    this.imageCompress.uploadFile().then(({image, orientation}) => {
      //this.imgResultBeforeCompress = image;
//      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


      this.imageCompress.compressFile(image, -1).then(
        result => {
         // this.imgResultAfterCompress = result;

  //        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));

          this.idProof = result;


          from(fetch(result)
          .then(res => res.blob())).pipe(mergeMap(res=>{
            const formData = new FormData();
            formData.append('idProofType', this.idProofType.value)
            formData.append('id', `${(this.id.value) ? this.id.value : 0}`)
            res && formData.append('idProof', res);
            return this.userService.uploadIdProof(formData);
          })).subscribe(res=>{

          }, err=>{
            console.log(err)
          })




        }
      );

    });


  }

  ngOnInit(): void {
    this.idProofTypes$ = this.userService.checkExists().pipe(mergeMap(res=>{
      this.idProofType.setValue(res?.name);
      this.id.setValue(res?.id);
      this.status.setValue(res?.status);
      this.idProof = res?.file_name;
      if(res?.status === 1){
        this.idProofType.disable();
      }
      return this.userService.idProofType()
    }));
  }

}
