import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Package, Shop } from 'src/app/lib/interfaces';
import { PackageService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-choose-subscription',
  templateUrl: './choose-subscription.component.html',
  styleUrls: ['./choose-subscription.component.scss']
})
export class ChooseSubscriptionComponent implements OnInit {
  package_id = new FormControl('');
  custom_days = new FormControl('');
  description = new FormControl('');
  receipt = new FormControl('');

  packages$: Observable<Package[]>
  @Input() shop: Shop;
  constructor(private packageService: PackageService,
    public modal: NgbActiveModal) { }

  onFileInput(files: FileList){

    this.receipt.setValue(files.item(0));
  }

  save(){
    Notiflix.Loading.Circle();
    const postData = {
      package_id: this.package_id.value,
      custom_days: this.custom_days.value,
      shop_id: this.shop.id,
      description: this.description.value,
    }

    const formData = new FormData();
    formData.append('package_id', `${ postData.package_id ?? `` }`);
    formData.append('shop_id', `${ postData.shop_id ?? `` }`);
    formData.append('description', `${ postData.description ?? `` }`);
    if(this.receipt.value)
      formData.append('receipt', this.receipt.value);

    this.packageService.assignPackageToShop(formData).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully updated `);
      this.modal.close();
    }, error=>{
      if(error?.error?.errors){
          if(error.error.errors?.custom_days){
            this.custom_days.setErrors({error: error.error.errors.custom_days})
          }


      }
      console.log(error.error.errors);
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {

    this.packages$ = this.packageService.listAllPackages(1, this.shop.shop_key);
  }

}
