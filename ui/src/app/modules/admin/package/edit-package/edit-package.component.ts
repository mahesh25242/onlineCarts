import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Package } from 'src/app/lib/interfaces';
import { PackageService } from '../../../../lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {
  @Input() pkg: Package;
  pkgFrm: FormGroup;
  constructor(public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private packageService: PackageService) { }

  get f(){
    return this.pkgFrm.controls;
  }
  save(){
    const postData = {
      id: this.f.id.value ?? 0,
      name: this.f.name.value,
      description: this.f.description.value,
      price: this.f.price.value,
      duration: this.f.duration.value,
      status: this.f.status.value,
    };
    this.packageService.save(postData).pipe(mergeMap((res) =>{
      return this.packageService.listAllPackages();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully updated `);
      this.modal.close();
    }, error=>{
      for(let result in this.pkgFrm.controls){
        if(error.error.errors[result]){
          this.pkgFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.pkgFrm.controls[result].setErrors(null);
        }
      }
      Notiflix.Loading.Remove();
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {
    this.pkgFrm = this.formBuilder.group({
      id: [this.pkg?.id, []],
      name: [this.pkg?.name, []],
      description: [this.pkg?.description, []],
      price: [this.pkg?.price, []],
      duration: [this.pkg?.duration, []],
      status: [this.pkg?.status ?? 1, []],
    });
  }

}
