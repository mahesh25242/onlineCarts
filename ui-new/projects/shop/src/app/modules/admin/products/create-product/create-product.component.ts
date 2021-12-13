import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ShopProductService, ShopProductCategoryService, GeneralService } from '../../../../lib/services';
import { ShopProduct, ShopProductCategory } from '../../../../lib/interfaces';

import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../categories/create-category/create-category.component';

import { ProductTag } from '../../modules/tag/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateProductStep1Component } from './create-product-setp-1/create-product-setp-1.component';
import { CreateProductStep2Component } from './create-product-setp-2/create-product-setp-2.component';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  selectedTab = new FormControl(0);

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons     
      [{'list': 'ordered'}, {'list': 'bullet'}],          
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme    
      [{'align': []}],

      ['clean'],                                       // remove formatting button

      ['link', 'video',]                   // link
    ]
  }
  product!: ShopProduct & { shop_product_tag?: ProductTag[]};
  createProductFrm!: FormGroup;
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
  //varients
  varientTypes = [
    {
      name:'Any',
      id: 0
    },
    {
      name:'Veg',
      id: 1
    },
    {
      name:'Non Veg',
      id: 2
    }
  ];
  categories$!: Observable<ShopProductCategory[]>;

  saveProdSubScr!: Subscription;
  formPathSubScr!: Subscription;
  productSubScr!: Subscription;
  constructor(private formBuilder: FormBuilder,
    private shopProductService: ShopProductService,
    private shopProductCategoryService: ShopProductCategoryService,
    private route:ActivatedRoute,
    private generalService: GeneralService,
    private router: Router,
    public dialog: MatDialog,
    
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any
    ) { }


 onSwipeLeft(evt: any){
    if(this.selectedTab.value == 0){
      this.selectedTab.setValue(1);
    }
  }


  onSwipeRight(evt: any){
    if(this.selectedTab.value == 1){
      this.selectedTab.setValue(0);
    }
  }



  saveProduct(step1:CreateProductStep1Component, step2:CreateProductStep2Component){
    this.notiflix.loading.standard();
    
    const formData = new FormData();
    
  
    step2.varients.controls.map((res: AbstractControl, i) =>{      
      formData.append(`variants[${i}][id]`, `${(res.value?.['id']) ? res.value?.['id'] : 0}`);
      formData.append(`variants[${i}][status]`, `${(res.value?.['status']) ? res.value?.['status'] : ''}`);
      formData.append(`variants[${i}][name]`, `${(res.value?.['name']) ? res.value?.['name'] : ''}`);
      formData.append(`variants[${i}][description]`, `${(res.value?.['description']) ? res.value?.['description'] : ''}`);
      formData.append(`variants[${i}][is_primary]`, `${res.value?.['is_primary']}`);
      formData.append(`variants[${i}][type]`, `${(res.value?.['type']) ?  JSON.stringify(res.value?.['type']): ''}`);
      formData.append(`variants[${i}][shop_product_id]`, `${(res.value?.['shop_product_id']) ? res.value?.['shop_product_id'] : 0}`);
      formData.append(`variants[${i}][actual_price]`, `${(res.value?.['actual_price']) ? res.value?.['actual_price'] : 0}`);
      formData.append(`variants[${i}][price]`, `${(res.value?.['price']) ? res.value?.['price'] : 0}`);
      formData.append(`variants[${i}][sortorder]`, `${(res.value?.['sortorder']) ? res.value?.['sortorder'] : 0}`);
      formData.append(`variants[${i}][image]`, res.value?.['image']);
      if(res.value?.['shop_product_varient_tags'] && res.value?.['shop_product_varient_tags'].length){
        formData.append(`variants[${i}][shop_product_varient_tags]`, `${(res.value?.['shop_product_varient_tags']) ?  JSON.stringify(res.value?.['shop_product_varient_tags']): ''}`);
      }
      
    });


    formData.append('id', `${step1.f?.['id'].value}`);
    formData.append('name', step1.f?.['name'].value);
    formData.append('description', step1.f?.['description'].value);
    formData.append('status', (step1.f?.['status'].value) ? '1' : '0');
    formData.append('sortorder', (step1.f?.['sortorder'].value) ? step1.f?.['sortorder'].value : 0);
    formData.append('shop_product_category_id', JSON.stringify(step1.f?.['shop_product_category_id'].value));
    if(step1.f?.['shop_product_tags'].value)
      formData.append('shop_product_tags', JSON.stringify(step1.f?.['shop_product_tags'].value));

      
    this.shopProductService.createProduct(formData).subscribe({
      complete: () =>{
        this.notiflix.loading.standard();
        this._snackBar.open(`Successfully saved product `, 'Close'); 
        this.router.navigate([`/admin/products/0`]);
      },
      error: (err) =>{
        if(err.status == 422){
          for(let result in this.createProductFrm.controls){
            if(result == 'varients'){
              for(let varient in (this.createProductFrm.controls['varients'] as FormArray).controls){
                for(let variantFrm in ((this.createProductFrm.controls['varients'] as FormArray).controls[varient] as FormGroup).controls){
                  if(err.error.errors[`variants.${varient}.${variantFrm}`]){
                    // isShiftTab = true;
                    ((this.createProductFrm.controls['varients'] as FormArray).controls[varient] as FormGroup).controls[variantFrm].setErrors({ error: err.error.errors[`variants.${varient}.${variantFrm}`] });
                  }else{
                    ((this.createProductFrm.controls['varients'] as FormArray).controls[varient] as FormGroup).controls[variantFrm].setErrors(null);
                  }
  
                }
              }
  
  
            }
  
  
            if(err.error.errors[result]){
              // isShiftTab = false;
              this.createProductFrm.controls[result].setErrors({ error: err.error.errors[result] });
            }else{
              this.createProductFrm.controls[result].setErrors(null);
            }
          }
          if(/*isShiftTab && */ this.createProductFrm.controls?.['name'].valid){
            this.selectedTab.setValue(1);
          }
  
        }
      }
    }).add(() => {
      this.notiflix.loading.remove();
    });
    

  }

  

  ngOnInit(): void {


    
    this.product = this.route.snapshot.data?.['product'];
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: `${(this.product?.id) ? `Edit ${this.product.name}` : `Create new product`}`,
      url:'',
      backUrl: 'admin/products/0'
    });

  }

  
  ngOnDestroy(){
    if(this.saveProdSubScr){
      this.saveProdSubScr.unsubscribe();
    }
    if(this.formPathSubScr){
      this.formPathSubScr.unsubscribe();
    }
    if(this.productSubScr){
      this.productSubScr.unsubscribe();
    }
  }
}
