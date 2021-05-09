import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  faHandPointRight = faHandPointRight;

  constructor() { }

  ngOnInit(): void {

  }

}
