import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../lib/interfaces';
import { PackageService } from '../lib/services';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  packages$: Observable<Package[]>
  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packages$ = this.packageService.packages;
  }

}
