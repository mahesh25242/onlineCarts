import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CmsService } from '@shop/app/lib/services';


@Component({
  selector: 'app-manage-cms-page',
  templateUrl: './manage-cms-page.component.html',
  styleUrls: ['./manage-cms-page.component.scss']
})
export class ManageCmsPageComponent implements OnInit {
  cmsForm!: FormGroup;
  @Input() page: any;
  @Output() reload = new EventEmitter();
  quillStyle = {
    height: '200px'
  };
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons     
      [{'list': 'ordered'}, {'list': 'bullet'}],          
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme    
      [{'align': []}],

      ['clean'],                                       // remove formatting button

      ['link', 'video',]                   // link
    ]
  }

  
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

    
    this.cmsService.save(postData).subscribe({
      complete: ()=> {
        this._snackBar.open(`Successfully saved`, 'Close'); 
        this.reload.emit();
      }
    }).add(() =>     this.notiflix.loading.remove());
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

}
