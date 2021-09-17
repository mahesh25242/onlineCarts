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
  packages$: Observable<Package[]>
  @Input() shop: Shop;
  constructor(private packageService: PackageService,
    public modal: NgbActiveModal) { }

  save(){
    console.log(this.package_id.value)
  }
  ngOnInit(): void {

    this.packages$ = this.packageService.listAllPackages(1);
  }

}
