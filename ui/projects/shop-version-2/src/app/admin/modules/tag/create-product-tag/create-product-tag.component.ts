import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {  ProductTagService }from '../services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-product-tag',
  templateUrl: './create-product-tag.component.html',
  styleUrls: ['./create-product-tag.component.scss']
})
export class CreateProductTagComponent implements OnInit {
  createTagFrm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductTagComponent>,
    private productTagService: ProductTagService) { }

  save(){
    Notiflix.Loading.Arrows();
    const postData = {
      name: this.f.name.value
    }
    let tag = null;
    this.productTagService.save(postData).pipe(mergeMap(res=>{
      tag = res?.data;
      return this.productTagService.tags();
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
