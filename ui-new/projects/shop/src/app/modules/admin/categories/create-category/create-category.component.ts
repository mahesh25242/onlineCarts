import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopProductCategoryService } from '../../../../lib/services/shop-product-category.service';
import { ShopProductCategory } from '../../../../lib/interfaces';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { catIcon } from './cat-icons';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  createCatFrm!: FormGroup;
  selected = 'option2';
  catIcon = catIcon;
  @Output() onCreation = new EventEmitter();


  statuses = [
    {
      name:'Active',
      id: 1
    },
    {
      name:'In-Active',
      id: 0
    }
  ];
  
  formPathSubScr!: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShopProductCategory,
  private formBuilder: FormBuilder,
    private shopProductCategoryService: ShopProductCategoryService,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f() { return this.createCatFrm.controls}

  saveCategory(){    
    this.notiflix.loading.standard();
    const formData = new FormData();
    formData.append('id', `${(this.f?.['id'].value) ? this.f?.['id'].value : 0}`);
    formData.append('name', (this.f?.['name'].value) ? this.f?.['name'].value : '');
    formData.append('description', (this.f?.['description'].value) ? this.f?.['description'].value : '');
    formData.append('status', (this.f?.['status'].value) ? '1' : '0');
    formData.append('sortorder', `${this.f?.['sortorder'].value}`);

    formData.append(`is_maticon`, (this.f?.['is_maticon'].value) ? `1` : `0`);
    if(this.f?.['is_maticon'].value){
      formData.append(`icon`, (this.f?.['icon'].value?.icon ? this.f?.['icon'].value?.icon : ''));
    }else{
      formData.append(`icon`, this.f?.['icon'].value);
    }

    this.shopProductCategoryService.createCategory(formData).pipe(mergeMap(res=>{
      this.onCreation.emit(res.data);
      return this.shopProductCategoryService.listCategories();
    })).subscribe({
      complete: () => this._snackBar.open(`Successfully saved category `, 'Close'),
      error: (error)=>{
        if(error.status == 422){
          for(let result in this.createCatFrm.controls){
            if(error.error.errors[result]){
              this.createCatFrm.controls[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.createCatFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    }).add(() =>  this.notiflix.loading.remove());
    
    
  }

  handleIconSelection( evt: Event) {
    const files = (evt.target as HTMLInputElement) ?? undefined;    
    if(files && files?.files?.[0])
      this.f?.['icon'].setValue(files?.files[0]);
  }

  ngOnInit(): void {

    this.createCatFrm= this.formBuilder.group({
      id: [null, []],
      name: [null, []],
      description: [null, []],
      status: [1, []],
      sortorder: [1, []],
      icon: [null, []],
      is_maticon: [null, []]
    });




      this.createCatFrm.patchValue({
        id: this.data?.id,
        name: this.data?.name,
        description: this.data?.description,
        status: (this.data?.status) ? 1 : (this.data?.status == 0 ? 0 : 1),
        sortorder: (this.data?.sortorder) ? this.data?.sortorder : 1,
        is_maticon: (this.data?.is_maticon) ? this.data?.is_maticon : 1
      });

      if(this.data?.is_maticon){
        catIcon.map(ico =>{
          if(ico.icon == this.data?.icon)
            this.f?.['icon'].setValue(ico);
        })

      }

  }

  ngOnDestroy(){   
    if(this.formPathSubScr){
      this.formPathSubScr.unsubscribe();
    }
  }
}
