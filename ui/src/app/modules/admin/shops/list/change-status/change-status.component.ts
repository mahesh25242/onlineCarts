import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Shop } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';
import { PrefillMessage } from '../../../modules/prefill-message/interfaces';
import { PrefillMessageService } from '../../../modules/prefill-message/services';


@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  @Input() shop: Shop;
  prefill_message_name = new FormControl('');
  prefillMessages$: Observable<PrefillMessage[]>;
  constructor(private shopService: ShopService,
    public modal: NgbActiveModal,
    private prefillMessageService: PrefillMessageService) { }

  changeStatus(){
    const postData = {
      shop_id:  this.shop.id,
      prefill_message_name : this.prefill_message_name.value
    };

    this.shopService.changeStatus(postData).pipe(mergeMap(res=>{
      return this.shopService.getAllShops(null, 0);
    })).subscribe();
    this.modal.close(true);

  }
  ngOnInit(): void {
    this.prefillMessages$ = this.prefillMessageService.messages();
  }

}
