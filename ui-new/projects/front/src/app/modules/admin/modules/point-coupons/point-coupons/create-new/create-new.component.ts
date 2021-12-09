import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public pc: PointCoupon,) { }

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

    this.pointCouponService.save(postData).subscribe(
      {
        next: (res) => {
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
    );
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
        start_date: {
          year: startDate?.getFullYear(),
          month: startDate?.getMonth() ? startDate?.getMonth() + 1 : null,
          day: startDate?.getDate(),
        },
        end_date:{
          year: endDate?.getFullYear(),
          month: endDate?.getMonth() ? endDate?.getMonth() + 1 : null,
          day: endDate?.getDate(),
        }
      });

    }
  }

}
