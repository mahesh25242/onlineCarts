import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { ShopProductCategoryService, ShopProductService } from 'src/app/lib/services';
import { RecognizedTextAction } from '../../lib/interface/voices';
import { SenseService } from '../../lib/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchFrm: FormGroup;
  @Input() isHead: boolean;

  destroy$ = new Subject();
  //recognized$ = this.senseService.getType(RecognizedTextAction);

	//micAccess$ = this.senseService.hasMicrofonAccess$;

  constructor(private formBuilder : FormBuilder,
    private shopProductCategoryService: ShopProductCategoryService,
    private shopProductService: ShopProductService,
    private router: Router,
    private route: ActivatedRoute
    //private senseService: SenseService
    ) {

    // this.recognized$
    // .pipe(
    //   debounceTime(200),
    //   tap((msg) => {
    //     // msg = `you said ${msg}`;
    //     this.senseService.speak(msg);
    //   }, takeUntil(this.destroy$))
    // )
    // .subscribe();
     }

  get f(){ return this.searchFrm.controls; }

  search(){
    if(this.f.q.value){
      this.shopProductService.allProduct = [];
      this.router.navigate([`/search/${this.f.q.value}`]);
    }
  }

  voice(){
    //this.senseService.activate();

  }
  ngOnInit(): void {
    this.searchFrm = this.formBuilder.group({
      q: [null, []]
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(res=>{
      this.f.q.setValue(res?.q);
    })


  }

  ngOnDestroy(){
    this.destroy$.next();
		this.destroy$.complete();
  }
}
