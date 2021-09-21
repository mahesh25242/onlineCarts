import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopService } from 'src/app/lib/services';

@Component({
  selector: 'app-filter-shops',
  templateUrl: './filter-shops.component.html',
  styleUrls: ['./filter-shops.component.scss']
})
export class FilterShopsComponent implements OnInit {
  filterFrm:FormGroup;
  constructor(private shopService: ShopService,
    private formBuilder: FormBuilder,) { }

  search(){
    const postData = {
      name: this.f.name.value,
      status: this.f.status.value,
      phone: this.f.phone.value,
    }
    this.shopService.getAllShops(postData).subscribe();
  }
  get f(){ return this.filterFrm.controls }
  ngOnInit(): void {
    this.filterFrm = this.formBuilder.group({
      name: [null, []],
      status: ["", []],
      phone: [null, []],
    });
  }

}
