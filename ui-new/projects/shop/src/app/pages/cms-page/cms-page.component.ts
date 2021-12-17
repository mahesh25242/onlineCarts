import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import find from 'lodash/find';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GeneralService, CmsService } from '../../lib/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {

  page$!: Observable<any>;
  constructor(private generalService: GeneralService,
    private cmsService: CmsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
    });
    this.page$ =   this.route.params.pipe(mergeMap(params =>{      
     
      return this.cmsService.getPages.pipe(map(res=>{
        const page = find(res, { url: params?.['catUrl']});
        if(page){
          this.generalService.bc$.next({
            siteName: (environment.siteName) ? environment.siteName : '',
            title: page?.name,
            url:'',
            backUrl: undefined
          });
        }else{
          
          this.router.navigate(['/404']);
        }
        
        return page;
      }));
    }))


  }

}
