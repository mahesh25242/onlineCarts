import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopProduct, Cart } from '../../lib/interfaces';
import { ShopProductService, CartService, GeneralService, ShopProductCategoryService }  from '../../lib/services';
import find from 'lodash/find';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faWhatsapp, faFacebook, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;
  icons: { fb: IconDefinition, wa: IconDefinition} = {fb: faFacebook, wa: faWhatsapp};  

  environment = environment;
  addToCartFrm!: FormGroup;
  cartSubScr!: Subscription;
  cart!: Cart;
  qty: number = 1;
  
  product!: ShopProduct;
  constructor(private shopProductService: ShopProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private matSnackBar: MatSnackBar,
    private generalService: GeneralService,
    private shopProductCategoryService: ShopProductCategoryService) { }

    get f(){ return  this.addToCartFrm.controls; }

  chooseVarient(){
    this.qty = 1;
    this.product.shop_product_selected_variant =  find(this.product.shop_product_variant, (spv)=> (spv.id == this.f?.['shop_product_variant_id']?.value));
  }

  updateCart(type: string  ='+'){
    switch(type){
      case '+':
        this.qty++;
      break;
      case '-':
        this.qty--;
      break;
    }

    this.qty = (this.qty<=0) ? 1 : this.qty;

  }

  addToCart(){
    let price =0;
    if(this.product?.shop_product_selected_variant?.price){
      price = this.product?.shop_product_selected_variant?.price * this.qty;
    }

    this.cart ={
      product: this.product,
      qty: this.qty,
      price: price,
      message: this.f?.['message']?.value
    };
    if(this.cartSubScr) this.cartSubScr.unsubscribe();
    this.cartSubScr = this.cartService.updateCart(this.cart, '++').subscribe(res =>{
//      console.log(res)
      this.matSnackBar.open(`${this.cart?.product?.name} - ${this.cart?.product?.shop_product_selected_variant?.name} ( ${this.cart.qty} ) is added`, 'close');

    });
  }

  ngOnInit(): void {

    this.shopProductCategoryService.hideTopCat$.next(true);
    this.product = this.route.snapshot.data["product"];

    if(this.product){
      this.shopProductCategoryService.selectedCategory$.next(this.product.shop_product_category);

      this.product.shop_product_selected_variant = this.product?.shop_product_primary_variant;
      this.generalService.bc$.next({
        siteName: environment.siteName ?? '',
        title: `${this.product.name}`,
        url:'',
        backUrl: `/${this?.product?.shop_product_category?.url}/varities`
      });
    }


    this.addToCartFrm = this.formBuilder.group({
      shop_product_variant_id: [this.product?.shop_product_primary_variant?.id, []],
      message: [null, []]
    });


  }

  ngOnDestroy(){
    if(this.cartSubScr){
      this.cartSubScr.unsubscribe();
    }
    this.shopProductCategoryService.hideTopCat$.next(false);
  }

  ngAfterViewInit(){
    const matSideNav = document.querySelector('mat-sidenav-content');
    if(matSideNav){
      matSideNav.scrollTop = 0;
    }    

  }
  dd(a: any){
    console.log(a)
  }}
