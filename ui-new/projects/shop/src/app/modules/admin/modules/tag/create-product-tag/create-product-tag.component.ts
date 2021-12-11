import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  ProductTagService, ProductVarientTagService }from '../services';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product-tag',
  templateUrl: './create-product-tag.component.html',
  styleUrls: ['./create-product-tag.component.scss']
})
export class CreateProductTagComponent implements OnInit {
  createTagFrm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductTagComponent>,
    private productTagService: ProductTagService,
    private productVarientTagService: ProductVarientTagService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  save(){
    this.notiflix.loading.standard();
    const postData = {
      name: this.f?.['name'].value
    }
    let tag:any = null;

    let service:any = null;
    if(this.data == 'varient'){
      service = this.productVarientTagService;
    }else{
      service = this.productTagService;
    }
    service.save(postData).pipe(mergeMap((res:any)=>{
      tag = res?.data;
      return service.tags();
    })).subscribe({
      complete: () =>{
        this._snackBar.open(`Successfully saved `, 'Close');
      },
      error: (err : any) =>{
        if(err.status == 422){
          for(let result in this.createTagFrm.controls){
            if(err.error.errors[result]){
              this.createTagFrm.controls[result].setErrors({ error: err.error.errors[result] });
            }else{
              this.createTagFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    }).add(() =>{
      this.notiflix.loading.remove();
    });
    
  

  }

  get f(){ return this.createTagFrm.controls}
  ngOnInit(): void {

    this.createTagFrm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

}
