import { Component, Inject, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../../../../lib/services';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-user-id',
  templateUrl: './upload-user-id.component.html',
  styleUrls: ['./upload-user-id.component.scss']
})
export class UploadUserIdComponent implements OnInit {
  idProofType:FormControl = new FormControl('');
  id:FormControl = new FormControl(0);
  status:FormControl = new FormControl(0);
  idProof!: string;
  idProofTypes$!: Observable<[{name?: string}]>;
  
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,
    @Inject('UploadImageService') public uploadImage: any) { }

   

    
  handleImageSelection(event: Event){
    this.notiflix.loading.standard();
    this.uploadImage.handleImageUpload(event).pipe(mergeMap(res=>{
      const formData:any = new FormData();

      formData.append('idProofType', this.idProofType.value)
      formData.append('id', `${(this.id.value) ? this.id.value : 0}`)
      res && formData.append('idProof', res);
      return this.userService.uploadIdProof(formData);      
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
    this.idProofTypes$ = this.userService.checkExists().pipe(mergeMap(res=>{
      console.log(res)
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
