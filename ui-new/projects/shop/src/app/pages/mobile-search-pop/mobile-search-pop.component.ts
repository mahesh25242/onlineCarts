import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-mobile-search-pop',
  templateUrl: './mobile-search-pop.component.html',
  styleUrls: ['./mobile-search-pop.component.scss']
})
export class MobileSearchPopComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;
  constructor(    
  ) {    
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.searchBox.nativeElement.focus();
    },100)
  }

  

  

}
