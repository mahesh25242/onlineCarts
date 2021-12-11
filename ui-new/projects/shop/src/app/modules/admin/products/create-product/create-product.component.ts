import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ShopProductService, ShopProductCategoryService, GeneralService } from '../../../../lib/services';
import { ShopProduct, ShopProductCategory } from '../../../../lib/interfaces';

import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../categories/create-category/create-category.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ProductTag } from '../../modules/tag/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  selectedTab = new FormControl(0);


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
    private imageCompress: NgxImageCompressService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any
    ) { }

  get f() { return this.createProductFrm.controls}

  get varients() {
    return this.createProductFrm.get('varients') as FormArray;
 }

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



  saveProduct(){
    this.notiflix.loading.standard();

    const formData = new FormData();

    this.varients.controls.map((res: any, i) =>{

      formData.append(`variants[${i}][id]`, `${(res.controls?.['id'].value) ? res.controls?.['id'].value : 0}`);
      formData.append(`variants[${i}][status]`, `${(res.controls?.['status'].value) ? res.controls?.['status'].value : ''}`);
      formData.append(`variants[${i}][name]`, `${(res.controls?.['name'].value) ? res.controls?.['name'].value : ''}`);
      formData.append(`variants[${i}][description]`, `${(res.controls?.['description'].value) ? res.controls?.['description'].value : ''}`);
      formData.append(`variants[${i}][is_primary]`, `${(res.controls?.['is_primary'].value) ? 1 : 0}`);
      formData.append(`variants[${i}][type]`, `${(res.controls?.['type'].value) ?  JSON.stringify(res.controls?.['type'].value): ''}`);
      formData.append(`variants[${i}][shop_product_id]`, `${(res.controls?.['shop_product_id'].value) ? res.controls?.['shop_product_id'].value : 0}`);
      formData.append(`variants[${i}][actual_price]`, `${(res.controls?.['actual_price'].value) ? res.controls?.['actual_price'].value : 0}`);
      formData.append(`variants[${i}][price]`, `${(res.controls?.['price'].value) ? res.controls?.['price'].value : 0}`);
      formData.append(`variants[${i}][sortorder]`, `${(res.controls?.['sortorder'].value) ? res.controls?.['sortorder'].value : 0}`);
      formData.append(`variants[${i}][image]`, res.controls?.['image'].value);
      if(res.controls?.['shop_product_varient_tags'].value && res.controls?.['shop_product_varient_tags'].value.length){
        formData.append(`variants[${i}][shop_product_varient_tags]`, `${(res.controls?.['shop_product_varient_tags'].value) ?  JSON.stringify(res.controls?.['shop_product_varient_tags'].value): ''}`);
      }
      
    });


    formData.append('id', `${this.f?.['id'].value}`);
    formData.append('name', this.f?.['name'].value);
    formData.append('description', this.f?.['description'].value);
    formData.append('status', (this.f?.['status'].value) ? '1' : '0');
    formData.append('sortorder', (this.f?.['sortorder'].value) ? this.f?.['sortorder'].value : 0);
    formData.append('shop_product_category_id', JSON.stringify(this.f?.['shop_product_category_id'].value));
    if(this.f?.['shop_product_tags'].value)
      formData.append('shop_product_tags', JSON.stringify(this.f?.['shop_product_tags'].value));


      this.notiflix.loading.standard();
      this._snackBar.open(`Successfully saved product `, 'Close'); 

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

  createCategory(){
    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: null,
    });

    dialogRef.componentInstance.onCreation.subscribe(res=>{
      if(res){
        this.categories$ = this.listCategories();
        this.f?.['shop_product_category_id'].setValue(res);
      }
    })
  }
  handleImageSelection(stat:FormGroup) {


    this.imageCompress.uploadFile().then(({image, orientation}) => {
      //this.imgResultBeforeCompress = image;
//      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


      this.imageCompress.compressFile(image, -1).then(
        result => {
         // this.imgResultAfterCompress = result;

  //        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));


        
          stat?.get('currImage')?.setValue(result)
          fetch(result)
          .then(res => res.blob())
          .then(img=>{
            stat.controls?.['image'].setValue(img);
          })


        }
      );

    });

  }

  addVarient(stat: FormGroup){
    let validation = true;
    if(!stat.controls?.['name'].value){
      validation = false;
      stat.controls?.['name'].setErrors({"error": 'The variant name field is required'});
      stat.controls?.['name'].markAsTouched()
    }
    if(!stat.controls?.['price'].value && stat.controls?.['price'].value !== 0){
      validation = false;
      stat.controls?.['price'].setErrors({"error": 'The price field is required'})
      stat.controls?.['price'].markAsTouched()
    }

    if(stat.controls?.['actual_price'].value && (stat.controls?.['actual_price'].value < stat.controls?.['price'].value)){
      validation = false;
      stat.controls?.['price'].setErrors({"error": 'Sale price is greater than actual price'})
      stat.controls?.['price'].markAsTouched()
    }
    if(validation){
      this.varients.push(this.formBuilder.group(this.varientFormBuild()));
    }
  }
  removeVarient(i: number){
    this.varients.removeAt(i);
  }

  varientFormBuild(vrnt : any=null, img=null){

      return {
        id: new FormControl((vrnt?.id ? vrnt?.id : 0)),
        status: new FormControl((vrnt?.status ? vrnt?.status : 1)),
        name: new FormControl((vrnt?.name ? vrnt?.name : '')),
        description: new FormControl((vrnt?.description ? vrnt?.description : '')),
        is_primary: new FormControl((vrnt?.is_primary ? vrnt?.is_primary : 0)),
        type: new FormControl((vrnt?.type ? vrnt?.type : { name:'Any', id: 0 })),
        shop_product_id: new FormControl((vrnt?.shop_product_id ? vrnt?.shop_product_id : 0)),
        actual_price: new FormControl((vrnt?.actual_price ? vrnt?.actual_price : 0)),
        price: new FormControl((vrnt?.price ? vrnt?.price : 0)),
        sortorder: new FormControl((vrnt?.sortorder ? vrnt?.sortorder : 0)),
        image: new FormControl(null),
        currImage: new FormControl(img),
        shop_product_varient_tags:new FormControl(vrnt?.shop_product_variant_tag)
      }
  }

  listCategories(){
    return this.shopProductCategoryService.listCategories({
      status: 1
    });
  }

  ngOnInit(): void {

    this.createProductFrm= this.formBuilder.group({
      id: [0, []],
      name: [null, []],
      description: [null, []],
      status: [1, []],
      sortorder: [1, []],
      shop_product_category_id: [null, []],
      shop_product_tags: [null, []],
      varients:this.formBuilder.array([]),
    });

    this.categories$ = this.listCategories();



    this.product = this.route.snapshot.data?.['product'];
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: `${(this.product?.id) ? `Edit ${this.product.name}` : `Create new product`}`,
      url:'',
      backUrl: 'admin/products/0'
    });


      this.varients.controls = [];
      this.createProductFrm.patchValue({
        id: (this.product?.id) ? this.product?.id : 0,
        name: (this.product?.name) ? this.product?.name : '',
        description: (this.product?.description) ? this.product?.description : '',
        status: (this.product?.status) ? 1 : (this.product?.status == 0 ? 0: 1),
        sortorder: (this.product?.sortorder) ? this.product?.sortorder : 1,
        shop_product_category_id: (this.product?.shop_product_category?.id) ? this.product?.shop_product_category : null,
      });
      if(this.product?.shop_product_variant){
        this.product.shop_product_variant.map(vrnt =>{
          let img: any=null;
          if(vrnt?.shop_product_image?.image)
            img = `${vrnt.shop_product_image.image_path}`;
          this.varients.push(this.formBuilder.group(this.varientFormBuild(vrnt, img)));
        });
        // this.varients.patchValue({
        //   id: res.shop_product_variant?.
        // });
      }else{
        this.varients.controls = [];
        this.varients.push(this.formBuilder.group(this.varientFormBuild()));
      }


      if(this.product?.shop_product_tag && this.product?.shop_product_tag?.length){
        this.createProductFrm.controls?.['shop_product_tags'].setValue(this.product.shop_product_tag);
      }




  }

  setPrimary( stat: FormControl){
    this.varients.controls.map((res: any)=> {
      return res.controls?.['is_primary'].setValue(0);
    })
    stat?.get('is_primary')?.setValue(1);
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
