import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-features-svg',
  templateUrl: './features-svg.component.svg',
  styleUrls: ['./features-svg.component.scss']
})
export class FeaturesSvgComponent implements OnInit, OnDestroy {  
  obs$: Observable<any>;
  @Input() svg: {
    width?: number,
    height?: number,
    viewBox?: string,
    images: Array<{
      height?: number,
      width?: number,
      x?: number,
      y?: number,
      src: string, 
      class?: string
    }>;
  };
  idx: number= 0;
  constructor() { }

  ngOnInit(): void {
    this.obs$ = timer(0, 2500).pipe(tap(res=>{
      this.idx = (this.idx + 1) % this.svg.images.length;
    }));
    
  
  }

  ngOnDestroy(){

  }
}
