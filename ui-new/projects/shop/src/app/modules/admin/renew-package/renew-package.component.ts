import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Package, Shop } from '../../../lib/interfaces';
import { PackageService, ShopService } from '../../../lib/services';
import { ShopPoint } from '../modules/shop-points/interfaces';
import { ChoosePackageComponent } from './choose-package/choose-package.component';
@Component({
  selector: 'app-renew-package',
  templateUrl: './renew-package.component.html',
  styleUrls: ['./renew-package.component.scss']
})
export class RenewPackageComponent implements OnInit {
  packages$!: Observable<Package[]>;
  shop$!: Observable<Shop & {shop_point?: ShopPoint} | null>;
  constructor(private packageService: PackageService,
    public dialog: MatDialog,
    private shopService: ShopService) { }

  choose(pkg: Package | null = null){

    let dialogRef = this.dialog.open(ChoosePackageComponent, {
      data: pkg,
    });
  }
  ngOnInit(): void {
    this.shop$ = this.shopService.aShop;

    this.packages$ = this.packageService.listAllPackages();
  }

}
