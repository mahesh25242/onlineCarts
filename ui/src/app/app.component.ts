import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  qpSubScr: Subscription;
  constructor(private route: ActivatedRoute){}
  title = 'cart';

  ngOnInit(){
    this.qpSubScr = this.route.queryParams.subscribe(res=>{
      if(res?.rf){
        localStorage.setItem("ref_by", res?.rf);
      }
    })
  }

  ngOnDestroy(){
    this.qpSubScr && this.qpSubScr.unsubscribe();
  }
}
