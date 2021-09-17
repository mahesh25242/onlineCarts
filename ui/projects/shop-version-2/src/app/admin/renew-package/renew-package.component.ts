import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Package } from 'src/app/lib/interfaces';
import { PackageService } from 'src/app/lib/services';
import { ChoosePackageComponent } from './choose-package/choose-package.component';
@Component({
  selector: 'app-renew-package',
  templateUrl: './renew-package.component.html',
  styleUrls: ['./renew-package.component.scss']
})
export class RenewPackageComponent implements OnInit {
  packages$: Observable<Package[]>;
  constructor(private packageService: PackageService,
    public dialog: MatDialog,) { }

  choose(pkg: Package | null = null){

    let dialogRef = this.dialog.open(ChoosePackageComponent, {
      data: pkg,
    });
  }
  ngOnInit(): void {
    this.packages$ = this.packageService.listAllPackages();
  }

}
