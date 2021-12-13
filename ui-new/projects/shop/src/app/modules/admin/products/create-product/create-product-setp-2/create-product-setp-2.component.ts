import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ShopProduct, ShopProductCategory } from '../../../../../lib/interfaces';

import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { ProductTag } from '../../../modules/tag/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-product-setp-2',
  templateUrl: './create-product-setp-2.component.html',
  styleUrls: ['./create-product-setp-2.component.scss']
})
export class CreateProductStep2Component implements OnInit {   
  product!: ShopProduct & { shop_product_tag?: ProductTag[]};
  createProductFrm!: FormGroup;
  
  categories$!: Observable<ShopProductCategory[]>;

  
  constructor(private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    public dialog: MatDialog,    
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,
    @Inject('UploadImageService') public uploadImage: any
    ) { }

  

  get varients() {    
    return this.createProductFrm.get('varients') as FormArray;
  }

 

  handleImageSelection(stat:AbstractControl, event: Event) {
    this.notiflix.loading.standard();
    this.uploadImage.handleImageUpload(event).pipe(map((res: Blob)=>{
      const reader = new FileReader();      
      reader.onload = (e) =>  {
        stat?.get('currImage')?.setValue(e?.target?.result);        
      };      
      reader.readAsDataURL(res);
      
      stat?.get('image')?.setValue(res);   
      return res;       
    })).subscribe({
      complete: () => this._snackBar.open(`Successfully uploaded `, 'Close'),
      error: () => {        
        this._snackBar.open(`Error while uploading`, 'Close')
      }
    }).add(() => {
      this.notiflix.loading.remove();
    });

//     this.imageCompress.uploadFile().then(({image, orientation}) => {
//       //this.imgResultBeforeCompress = image;
// //      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


//       this.imageCompress.compressFile(image, -1).then(
//         result => {
//          // this.imgResultAfterCompress = result;

//   //        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));


        
//           stat?.get('currImage')?.setValue(result)
//           fetch(result)
//           .then(res => res.blob())
//           .then(img=>{
//             stat.controls?.['image'].setValue(img);
//           })


//         }
//       );

//     });

  }

  addVarient(stat: AbstractControl){
    let validation = true;
    if(!stat?.get('name')?.value){
      validation = false;
      stat?.get('name')?.setErrors({"error": 'The variant name field is required'});
      stat?.get('name')?.markAsTouched()
    }
    if(!stat?.get('price')?.value && stat?.get('price')?.value !== 0){
      validation = false;
      stat?.get('price')?.setErrors({"error": 'The price field is required'})
      stat?.get('price')?.markAsTouched()
    }

    if(stat?.get('actual_price')?.value && (stat?.get('actual_price')?.value < stat?.get('price')?.value)){
      validation = false;
      stat?.get('price')?.setErrors({"error": 'Sale price is greater than actual price'})
      stat?.get('price')?.markAsTouched()
    }
    if(validation){
      this.varients.push(this.varientFormBuild());
    }
  }
  removeVarient(i: number){
    this.varients.removeAt(i);
  }

  varientFormBuild(vrnt : any=null, img=null){
    
      return this.formBuilder.group({
        id: [(vrnt?.id ??  0), []], //new FormControl((vrnt?.id ??  0)),
        status: [(vrnt?.status ?? 1), []], //new FormControl((vrnt?.status ?? 1)),
        name: [(vrnt?.name ??  ''), []], //new FormControl((vrnt?.name ??  '')),
        description: [(vrnt?.description  ?? ''), []], //new FormControl((vrnt?.description  ?? '')),
        is_primary: [(Number(vrnt?.is_primary) ?? 0), []], //new FormControl((vrnt?.is_primary ?? 0)),
        type: [(vrnt?.type ??  { name:'Any', id: 0 }), []], //new FormControl((vrnt?.type ??  { name:'Any', id: 0 })),
        shop_product_id: [(vrnt?.shop_product_id ??  0), []], //new FormControl((vrnt?.shop_product_id ??  0)),
        actual_price: [(vrnt?.actual_price ??  0), []], //new FormControl((vrnt?.actual_price ??  0)),
        price: [(vrnt?.price ?? vrnt?.price), []], //new FormControl((vrnt?.price ?? vrnt?.price)),
        sortorder: [(vrnt?.sortorder ??  0), []], //new FormControl((vrnt?.sortorder ??  0)),
        image: [null, []], //new FormControl(null),
        currImage: [img, []], //new FormControl(img),
        shop_product_varient_tags: [vrnt?.shop_product_variant_tag], // new FormControl(vrnt?.shop_product_variant_tag)
      });
  }

  

  ngOnInit(): void {

  

    this.createProductFrm= this.formBuilder.group({      
      varients:this.formBuilder.array([]),
    });
    



    this.product = this.route.snapshot.data?.['product'];
    


      this.varients.controls = [];

 
      
      if(this.product?.shop_product_variant){
        this.product.shop_product_variant.map(vrnt =>{
          let img: any=null;
          if(vrnt?.shop_product_image?.image)
            img = `${vrnt.shop_product_image.image_path}`;
          this.varients.push(this.varientFormBuild(vrnt, img));
        });
        // this.varients.patchValue({
        //   id: res.shop_product_variant?.
        // });
      }else{
        this.varients.controls = [];
        this.varients.push(this.varientFormBuild());
      }


      this.varients.valueChanges.subscribe(res=>{
        console.log(res)
      })


  }

  
  setPrimary( stat: AbstractControl){
    this.varients.controls.map((res: any)=> {      
      return res.controls?.['is_primary'].setValue(0);
    })    
    stat?.get('is_primary')?.setValue(1);
  }

  
}
