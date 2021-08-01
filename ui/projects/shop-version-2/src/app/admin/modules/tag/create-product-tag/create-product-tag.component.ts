import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  ProductTagService, ProductVarientTagService }from '../services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';
import { ProductTag, ProductVarientTag  } from '../interfaces';

@Component({
  selector: 'app-create-product-tag',
  templateUrl: './create-product-tag.component.html',
  styleUrls: ['./create-product-tag.component.scss']
})
export class CreateProductTagComponent implements OnInit {
  createTagFrm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductTagComponent>,
    private productTagService: ProductTagService,
    private productVarientTagService: ProductVarientTagService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  save(){
    Notiflix.Loading.Arrows();
    const postData = {
      name: this.f.name.value
    }
    let tag = null;

    let service = null;
    if(this.data == 'varient'){
      service = this.productVarientTagService;
    }else{
      service = this.productTagService;
    }
    service.save(postData).pipe(mergeMap((res:any)=>{
      tag = res?.data;
      return service.tags();
    })).subscribe(res=>{
      this.dialogRef.close(tag);
      Notiflix.Notify.Success(`Successfully saved tag `);
    }, error=>{
      if(error.status == 422){
        for(let result in this.createTagFrm.controls){
          if(error.error.errors[result]){
            this.createTagFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.createTagFrm.controls[result].setErrors(null);
          }
        }
      }
    }).add(() =>{
      Notiflix.Loading.Remove();
    });

  }

  get f(){ return this.createTagFrm.controls}
  ngOnInit(): void {

    this.createTagFrm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

}
