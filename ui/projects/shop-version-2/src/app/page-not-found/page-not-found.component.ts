import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GeneralService, CmsService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  page$: Observable<any>;
  constructor(private generalService: GeneralService,
    private cmsService: CmsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.page$ =   this.route.url.pipe(mergeMap(url =>{
      let path = null;
      if(url[0] && url[0]?.path){
        path = url[0].path;
      }



      return this.cmsService.getPages.pipe(map(res=>{
        const page = find(res, { url: path});
        this.generalService.bc$.next({
          siteName: environment.siteName,
          title: page.name,
          url:'',
          backUrl: null
        });

        return page;
      }));
    }))


  }

}
