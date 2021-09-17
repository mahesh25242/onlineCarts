import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Package, Shop } from 'src/app/lib/interfaces';
import { PackageService } from 'src/app/lib/services';

@Component({
  selector: 'app-choose-subscription',
  templateUrl: './choose-subscription.component.html',
  styleUrls: ['./choose-subscription.component.scss']
})
export class ChooseSubscriptionComponent implements OnInit {
  packages$: Observable<Package[]>
  @Input() shop: Shop;
  constructor(private packageService: PackageService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.packages$ = this.packageService.listAllPackages(1);
  }

}
