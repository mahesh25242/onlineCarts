import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/lib/services';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  images: Array<{image: string, title?: string , description?: string}>;

  showBanner$: Observable<boolean>;
  constructor(private _modalService: NgbModal,
    private router: Router,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    this.images = [
      {
        image: 'assets/banner2.jpg',
        title: "test",
        description: "test descrpition"
      },
      {
        image: 'assets/banner3.jpg',
        title: "test",
        description: "test descrpition"
      }
    ];

    this.showBanner$ = this.generalService.showbanner$.asObservable();

  }

  ngOnDestroy(){

  }
}
