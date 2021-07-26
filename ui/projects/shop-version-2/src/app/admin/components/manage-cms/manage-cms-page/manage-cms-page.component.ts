import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { CmsService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-manage-cms-page',
  templateUrl: './manage-cms-page.component.html',
  styleUrls: ['./manage-cms-page.component.scss']
})
export class ManageCmsPageComponent implements OnInit, OnDestroy {
  cmsForm: FormGroup;
  @Input() page: any;
  @Output() reload = new EventEmitter();

  saveSubScr: Subscription;
  constructor(private cmsService: CmsService,
    private formBuilder: FormBuilder) { }


    get f(){ return this.cmsForm.controls}
  savePage(){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.save-cms-btn`);

    const postData  = {
      id: this.f.id.value,
      name: this.f.name.value,
      content: this.f.content.value,
      status: this.f.status.value,
      url: this.f.url.value,
    }

    this.saveSubScr = this.cmsService.save(postData).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved`);
      Notiflix.Block.Remove(`.save-cms-btn`);

      this.reload.emit();
    },err=>{
      Notiflix.Notify.Failure(`Sorry unexpected error occur `);
      Notiflix.Block.Remove(`.save-cms-btn`);
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
