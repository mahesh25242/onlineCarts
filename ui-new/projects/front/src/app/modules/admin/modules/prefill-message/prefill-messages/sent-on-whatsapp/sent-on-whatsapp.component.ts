import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrefillMessage } from '../../interfaces';
import { PrefillMessageService } from '../../services';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sent-on-whatsapp',
  templateUrl: './sent-on-whatsapp.component.html',
  styleUrls: ['./sent-on-whatsapp.component.scss']
})
export class SentOnWhatsappComponent implements OnInit {  
  saveFrm!: FormGroup;
  constructor(private formBuilder: FormBuilder,    
    private prefillMessageService: PrefillMessageService,
    private breakpointObserver: BreakpointObserver,
    public dialogRef: MatDialogRef<SentOnWhatsappComponent>,
    @Inject(MAT_DIALOG_DATA) public pm: PrefillMessage) { }


  get f(){ return this.saveFrm.controls}

  sent(){    
    if(this.saveFrm.valid) {
      this.breakpointObserver.observe([
        Breakpoints.Handset,
        Breakpoints.Tablet
      ]).subscribe(res=>{
        let url:string = '';
        const name = this.f['name'].value;
        const message = eval('`'+this.pm.message+'`');
        if(res.matches){
          url =  `https://api.whatsapp.com/send?phone=${this.f['mobile'].value}&text=${message}`
        }else{
          url =  `https://web.whatsapp.com/send?phone=${this.f['mobile'].value}&text=${message}`
        }
  
        window.open(
          url,
          '_blank' // <- This is what makes it open in a new window.
        );
  
        const postData = {
          phone: this.f['mobile'].value,
          pm_id: this.pm.id
        };
        this.prefillMessageService.sentOnWhatsapp(postData).subscribe(res=>{
        });
        
      })
    }
    
  }

  ngOnInit(): void {
    this.saveFrm = this.formBuilder.group({
      mobile: ['+91', []],
      name: [null, []]
    });
  }

}
