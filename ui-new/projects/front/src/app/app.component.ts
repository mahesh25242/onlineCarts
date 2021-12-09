import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare const botmanChatWidget:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  qpSubScr: Subscription | undefined;
  constructor(private route: ActivatedRoute, private router: Router){}

  title = 'front';

  ngOnInit(){
    this.qpSubScr = this.route.queryParams.subscribe(res=>{
      if(res?.['rf']){
        localStorage.setItem("ref_by", res?.['rf']);
      }
    })

    window.addEventListener("message", (event) => {
      if(event?.data?.redirect){
        this.router.navigate([event.data.redirect]);
        if(window.screen.width < 500){
          botmanChatWidget.close()
        }
      }

    }, false);

  }

  ngOnDestroy(){
    this.qpSubScr && this.qpSubScr.unsubscribe();
  }

}
