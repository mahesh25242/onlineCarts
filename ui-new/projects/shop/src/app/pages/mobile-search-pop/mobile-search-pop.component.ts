import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopProductService } from '@shop/app/lib/services';


@Component({
  selector: 'app-mobile-search-pop',
  templateUrl: './mobile-search-pop.component.html',
  styleUrls: ['./mobile-search-pop.component.scss']
})
export class MobileSearchPopComponent implements OnInit {
  searchFrm!: FormGroup;
  @ViewChild('searchBox') searchBox!: ElementRef;
  constructor(   
    private formBuilder: FormBuilder,
    private shopProductService: ShopProductService,
    private router: Router, 
  ) {    
  }
  get f(){ return this.searchFrm.controls; }
  search(){
    
    if(this.f?.['q'].value){      
      this.shopProductService.allProduct = [];      
      this.router.navigate([`/search/${this.f?.['q'].value}`]);
    }
  }

  ngOnInit(): void {
    this.searchFrm = this.formBuilder.group({
      q: [null, []]
    });


    setTimeout(()=>{
      this.searchBox.nativeElement.focus();
    },100);
  }

  

  

}
