import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PointCoupon } from '../../interfaces';
import { PointCouponService } from '../../services';


@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  


  
  saveFrm!: FormGroup;
  constructor(private formBuilder: FormBuilder,    
    private pointCouponService: PointCouponService,
    public dialogRef: MatDialogRef<CreateNewComponent>,
    @Inject(MAT_DIALOG_DATA) public pc: PointCoupon,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any,) { }

  save(){    
    const postData = {
      id: (this.f['id'].value) ? this.f['id'].value : 0,
      description: this.f['description'].value,
      no_use: this.f['no_use'].value,
      point: this.f['point'].value,
      start_date: this.f['start_date'].value,
      end_date: this.f['end_date'].value,
      status: this.f['status'].value,
    };    
    this.notiflix.loading.standard();
    this.pointCouponService.save(postData).subscribe(
      {
        next: (res) => {
          this._snackBar.open(res?.message, 'Close');
        },
        error: (error) => {
          if(error.status === 422){
            for(let result in this.saveFrm.controls){
              if(error.error.errors[result]){
                this.saveFrm.controls[result].setErrors({ error: error.error.errors[result] });
              }else{
                this.saveFrm.controls[result].setErrors(null);
              }
            }
          }
        },
        complete: () => {
          this.dialogRef.close();
        }
      }
    ).add(() => {
      this.notiflix.loading.remove();
    });
  }

  get f(){ return this.saveFrm.controls}
  ngOnInit(): void {


    this.saveFrm = this.formBuilder.group({
      id: [this.pc?.id, []],
      description: [this.pc?.description, []],
      no_use: [this.pc?.no_use, []],
      fresh_use: [ (this.pc?.fresh_use ?? 0) , []],
      per_shop_use: [this.pc?.per_shop_use, []],
      point: [this.pc?.point, []],
      start_date: [null, []],
      end_date: [null, []],
      status: [ (this.pc?.status ?? 1) , []],
    });
    if(this.pc){
      const startDate = (this.pc?.start_date) ? new Date(this.pc?.start_date) : null;

      const endDate = (this.pc?.end_date) ? new Date(this.pc?.end_date) : null;
      this.saveFrm.patchValue({
        start_date: startDate,
        end_date:endDate
      });

    }
  }

}
