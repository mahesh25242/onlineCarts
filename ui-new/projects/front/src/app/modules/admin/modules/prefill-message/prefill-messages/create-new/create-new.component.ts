import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrefillMessage } from '../../interfaces';
import { PrefillMessageService } from '../../services';


@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
 
  saveFrm!: FormGroup;
  constructor(private formBuilder: FormBuilder,    
    private prefillMessageService: PrefillMessageService,
    public dialogRef: MatDialogRef<CreateNewComponent>,
    @Inject(MAT_DIALOG_DATA) public pm: PrefillMessage,
    @Inject('NotiflixService') public notiflix: any,
    private _snackBar: MatSnackBar) { }

  save(){
    this.notiflix.loading.standard();
    const postData = {
      id: (this.f['id'].value) ? this.f['id'].value : 0,
      name: this.f['name'].value,
      subject: this.f['subject'].value,
      message: this.f['message'].value,
    };

    this.prefillMessageService.save(postData).subscribe(
      {
        next: (res) => {
          this._snackBar.open(res?.message, 'Close');
        },
        error: (err) => {
          if(err.status === 422){
            for(let result in this.saveFrm.controls){
              if(err.error.errors[result]){
                this.saveFrm.controls[result].setErrors({ error: err.error.errors[result] });
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
      id: [this.pm?.id, []],
      name: [this.pm?.name, []],
      subject: [this.pm?.subject, []],
      message: [this.pm?.message, []],
      is_default: [this.pm?.is_default, []],
    });
  }

}
