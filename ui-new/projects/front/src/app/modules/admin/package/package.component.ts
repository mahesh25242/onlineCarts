import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Package } from '../../../lib/interfaces';
import { PackageService } from '../../../lib/services';
import { EditPackageComponent } from './edit-package/edit-package.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  packages$!: Observable<Package[] | null>;

  displayedColumns: string[] = ['no', 'name', 'price', 'duration', 'status'];


  constructor(private packageService: PackageService,
    private dialog: MatDialog) { }

  createNew(pkg: Package | null = null){
    const activeModal = this.dialog.open(EditPackageComponent,{
      data: pkg
    });    
  }
  ngOnInit(): void {
    this.packages$ = this.packageService.packages;
  }

}
