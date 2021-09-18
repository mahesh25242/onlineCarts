import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  package_id = new FormControl('');
  custom_days = new FormControl('');
  packages$: Observable<Package[]>
  @Input() shop: Shop;
  constructor(private packageService: PackageService,
    public modal: NgbActiveModal) { }

  save(){
    const postData = {
      package_id: this.package_id.value,
      custom_days: this.custom_days.value,
      shop_id: this.shop.id
    }
    this.packageService.assignPackageToShop(postData).subscribe();
  }
  ngOnInit(): void {

    this.packages$ = this.packageService.listAllPackages(1);
  }

}
