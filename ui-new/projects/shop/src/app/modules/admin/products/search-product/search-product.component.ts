import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ShopProductService } from '../../../../lib/services';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchFrm!: FormGroup;
  @Input() pageEvent!: PageEvent;
  constructor(private formBuilder: FormBuilder,
    private shopProductService: ShopProductService,
    @Inject('NotiflixService') public notiflix: any) { }

  search(){
    const postData = {
      pageSize : (this.pageEvent?.pageSize) ? this.pageEvent?.pageSize : 20,
      q: this.searchFrm.controls?.['q'].value,
    }
    this.notiflix.loading.standard();    

    
    this.shopProductService.listproducts(1, postData).subscribe().add(() => {
      this.notiflix.loading.remove();    
    });
  }
  reset(){
    this.searchFrm.controls?.['q'].setValue('');
    this.search();
  }
  ngOnInit(): void {
    this.searchFrm = this.formBuilder.group({
      q: [null, []]
    });
  }

}
