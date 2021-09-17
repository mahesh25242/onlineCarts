import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Package } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-choose-package',
  templateUrl: './choose-package.component.html',
  styleUrls: ['./choose-package.component.scss']
})
export class ChoosePackageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Package,
  public dialogRef: MatDialogRef<ChoosePackageComponent>) { }

  ngOnInit(): void {
  }

}
