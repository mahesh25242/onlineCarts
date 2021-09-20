import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Package } from 'src/app/lib/interfaces';
import { PackageService } from '../../../lib/services';
import { EditPackageComponent } from './edit-package/edit-package.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  packages$: Observable<Package[]>;
  constructor(private packageService: PackageService,
    private _modalService: NgbModal) { }

  createNew(pkg: Package = null){
    const activeModal = this._modalService.open(EditPackageComponent,{
      size: 'lg'
    });
    activeModal.componentInstance.pkg = pkg;
  }
  ngOnInit(): void {
    this.packages$ = this.packageService.packages;
  }

}
