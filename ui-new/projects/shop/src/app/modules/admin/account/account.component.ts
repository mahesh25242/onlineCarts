import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  tabIndex: number = 0;
  constructor(private router: Router) { }

  onTabChanged(evt: any){
    switch(evt.index) {
      case 0:
        this.router.navigate(['/admin/account']);
      break;

      case 1:
        this.router.navigate(['/admin/account/help-desk']);
      break;

      case 2:
        this.router.navigate(['/admin/account/my-payments']);
      break;

      case 3:
        this.router.navigate(['/admin/account/my-abuses']);
      break;
    }
  }
  ngOnInit(): void {
    if(this.router.url.includes("help-desk")){
      this.tabIndex = 1;
    }
    if(this.router.url.includes("my-payments")){
      this.tabIndex = 2;
    }
    if(this.router.url.includes("my-abuses")){
      this.tabIndex = 3;
    }
  }

}
