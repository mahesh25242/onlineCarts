import { Component, Input, OnInit } from '@angular/core';
import { Package } from '@app/lib/interfaces';
import { RazorpayService } from '../services';
import { WindowRefService } from '../window-ref.service';
import { environment } from '@shop/environments/environment';
@Component({
  selector: 'fire-razor-gateway',
  templateUrl: './razor-gateway.component.html',
  styleUrls: ['./razor-gateway.component.scss'],
  providers: [WindowRefService]
})
export class RazorGatewayComponent implements OnInit {  
  @Input() package: Package | undefined;
  constructor(private winRef: WindowRefService,
    private razorpayService: RazorpayService) {

  }

  ngOnInit(): void {

  }

  createRzpayOrder() {
    this.razorpayService.createPackageOrder(this.package).subscribe({
      next: (res) => {
        if(res?.order_id && res?.amount > 0)
          this.payWithRazor(res)
        else
          console.log('Order not created')
      }
    });    
    // call api to create order_id
    // ;
  }

  payWithRazor(order:any) {    
    const options: any = {
      key: 'rzp_test_VQCWnIj9uvtxiZ',
      amount: order?.amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: order?.currency,
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: order?.order_id, // order_id created by you in backend
      "prefill": {
        "name": "Mehul Bagda",
        "email": "mehul.bagda@example.com",
        "contact": "9995453566"
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: environment.themeColor
      }
    };
    options.handler = ((response:any, error:any) => {
      const postData = {
        razorpay_signature: response?.razorpay_signature,
        razorpay_payment_id: response?.razorpay_payment_id,
        razorpay_order_id: response?.razorpay_order_id,
      }
      this.razorpayService.paymentSuccess(postData).subscribe();
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });    
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
