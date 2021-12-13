import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShopProductCategoryService } from '../../../../../lib/services';
import { ShopProduct, ShopProductCategory } from '../../../../../lib/interfaces';

import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../../categories/create-category/create-category.component';

import { ProductTag } from '../../../modules/tag/interfaces';


@Component({
  selector: 'app-create-product-setp-1',
  templateUrl: './create-product-setp-1.component.html',
  styleUrls: ['./create-product-setp-1.component.scss']
})
export class CreateProductStep1Component implements OnInit {


  quillStyle = {
    height: '200px'
  };

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
  categories$!: Observable<ShopProductCategory[]>;

  
  
  
  constructor(private formBuilder: FormBuilder,
    private shopProductCategoryService: ShopProductCategoryService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    
    @Inject('NotiflixService') public notiflix: any
    ) { }

  get f() { return this.createProductFrm.controls }

  

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




  listCategories(){
    return this.shopProductCategoryService.listCategories({
      status: 1
    });
  }

  ngOnInit(): void {

    

    this.createProductFrm= this.formBuilder.group({
      id: [0, []],
      name: ['', [Validators.required]],
      description: ['', []],
      status: [1, []],
      sortorder: [1, []],
      shop_product_category_id: [null, [Validators.required]],
      shop_product_tags: [null, []],
      varients:this.formBuilder.array([]),
    });

    this.categories$ = this.listCategories();



    this.product = this.route.snapshot.data?.['product'];
    

      

      if(this.product){
        this.createProductFrm.patchValue({
          id: (this.product?.id) ? this.product?.id : 0,
          name: (this.product?.name) ? this.product?.name : '',
          description: (this.product?.description) ? this.product?.description : '',
          status: (this.product?.status) ? 1 : (this.product?.status == 0 ? 0: 1),
          sortorder: (this.product?.sortorder) ? this.product?.sortorder : 1,
          shop_product_category_id: (this.product?.shop_product_category?.id) ? this.product?.shop_product_category.id : 0,
        });
      }
      
     


      if(this.product?.shop_product_tag && this.product?.shop_product_tag?.length){
        this.createProductFrm.controls?.['shop_product_tags'].setValue(this.product.shop_product_tag);
      }


  }

  

  
}
