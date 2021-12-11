import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../../../lib/services';


@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {
  searchFrm!: FormGroup;
  @Input() pageEvent!: PageEvent;
  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    public datepipe: DatePipe,
    @Inject('NotiflixService') public notiflix: any) { }

    reset(){
      this.searchFrm.patchValue({
        start_date: null,
        end_date: null,
        q: null
      });
      this.search();
    }
  search(){
    const startDate = (this.f?.['start_date'].value) ? this.datepipe.transform(this.f?.['start_date'].value, 'yyyy-MM-dd') : null;
    const endDate = (this.f?.['end_date'].value) ? this.datepipe.transform(this.f?.['end_date'].value, 'yyyy-MM-dd') : null;
    const postData = {
      pageSize : (this.pageEvent?.pageSize) ? this.pageEvent?.pageSize : 20,
      q: this.f?.['q'].value,
      start_date: startDate,
      end_date: endDate,
    }
    this.notiflix.loading.standard();
    this.cartService.getAllOrders(1, postData).subscribe().add(() => this.notiflix.loading.remove());
  }

  get f(){ return this.searchFrm.controls}
  ngOnInit(): void {
    this.searchFrm = this.formBuilder.group({
      q: [null, []],
      start_date: [null, []],
      end_date: [null, []],
    });
  }

}
