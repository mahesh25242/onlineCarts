import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsService } from '../../../../lib/services';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {

  pages$!: Observable<any[]>;
  constructor(private cmsService: CmsService) { }



  ngOnInit(): void {

    this.pages$ = this.cmsService.pages().pipe(map(res=>{
      if(!res || !res.length){
        res = [
          {
            name: 'About Us',
            content: 'About Us',
            url: 'about_us',
            status: 1
          }
      ];
      }

      return res;
    }));
  }

}
