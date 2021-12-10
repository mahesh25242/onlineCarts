import { Component, OnInit } from '@angular/core';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsService } from 'src/app/lib/services';

@Component({
  selector: 'app-order-terms',
  templateUrl: './order-terms.component.html',
  styleUrls: ['./order-terms.component.scss']
})
export class OrderTermsComponent implements OnInit {
  page$: Observable<any>;
  constructor(
    private cmsService: CmsService) { }

  ngOnInit(): void {
    this.page$ = this.cmsService.getPages.pipe(map(res=>{
      return find(res, { url: 'terms'})
    }))

  }

}
