import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Package } from '../../lib/interfaces';
import { PackageService } from '../../lib/services';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  packages$!: Observable<Package[] | null | undefined>
  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packages$ = this.packageService.packages;
  }

}
