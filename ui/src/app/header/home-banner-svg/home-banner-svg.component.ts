import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/lib/services';
import { sample } from 'lodash';


@Component({
  selector: 'app-home-banner-svg',
  templateUrl: './home-banner-svg.component.svg',
  styleUrls: ['./home-banner-svg.component.scss']
})
export class HomeBannerSvgComponent implements OnInit, OnDestroy {
  images: Array<{image: string, class?: string}>;
  image: {image: string, class?: string};
  showBanner$: Observable<any>;
  isStop: boolean = false;

  constructor(
    private router: Router,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    this.images = [
      {
        image: './assets/banner/brown-home.png',
        class:'animate__bounce'
      },
      {
        image: './assets/banner/cyan-home.png',
        class:'animate__pulse'
      },
      {
        image: './assets/banner/deep-orange-home.png',
        class:'animate__shakeX'
      },
      {
        image: './assets/banner/green-home.png',
        class:'animate__swing'
      },
      {
        image: './assets/banner/light-blue-home.png',
        class:'animate__bounceInLeft'
      },
      {
        image: './assets/banner/lime-home.png',
        class:'animate__fadeInLeft'
      },
      {
        image: './assets/banner/pink-home.png',
        class:'animate__rotateInDownLeft'
      },
      {
        image: './assets/banner/pink-home.png',
        class:'animate__zoomIn'
      },
      {
        image: './assets/banner/teal-home.png',
        class:'animate__flipInX'
      },
    ];    
    this.showBanner$ = timer(0, 2500).pipe(tap(res =>{
      this.image = sample(this.images);
    }));
    

  }

  ngOnDestroy(){

  }
}
