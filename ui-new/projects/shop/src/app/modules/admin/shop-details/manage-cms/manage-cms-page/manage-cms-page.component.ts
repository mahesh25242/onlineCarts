import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CmsService } from '../../../../../lib/services';


@Component({
  selector: 'app-manage-cms-page',
  templateUrl: './manage-cms-page.component.html',
  styleUrls: ['./manage-cms-page.component.scss']
})
export class ManageCmsPageComponent implements OnInit, OnDestroy {
  cmsForm!: FormGroup;
  @Input() page: any;
  @Output() reload = new EventEmitter();

  saveSubScr!: Subscription;
  constructor(private cmsService: CmsService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }


    get f(){ return this.cmsForm.controls}
  savePage(){
    this.notiflix.loading.standard();

    const postData  = {
      id: this.f?.['id'].value,
      name: this.f?.['name'].value,
      content: this.f?.['content'].value,
      status: this.f?.['status'].value,
      url: this.f?.['url'].value,
    }

    
    this.saveSubScr = this.cmsService.save(postData).subscribe({
      complete: ()=> {
        this._snackBar.open(`Successfully saved`, 'Close'); 
        this.reload.emit();
      }
    });
  }

  ngOnInit(): void {

    this.cmsForm = this.formBuilder.group({
      id: [0, []],
      name: [null, []],
      content: [null, []],
      status: [1, []],
      url: [null, []],
    });

    this.cmsForm.patchValue(this.page);
  }

  ngOnDestroy(){
    this.saveSubScr && this.saveSubScr.unsubscribe();
  }

}
