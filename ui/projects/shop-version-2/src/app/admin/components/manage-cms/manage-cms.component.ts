import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { CmsService } from 'src/app/lib/services';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {

  pages$: Observable<any[]>;
  constructor(private cmsService: CmsService) { }



  ngOnInit(): void {

    this.pages$ = this.cmsService.pages().pipe(map(res=>{
      if(!res || !res.length){
        res = [{
          name: 'About Us',
          content: 'About Us',
          url: 'about_us',
          status: 1
        }];
      }

      return res;
    }));
  }

}
