import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  item:any[] = [
    {
      t: `Product Categorisation`,
      c: `You can categorize and list your product.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/categories/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,
            class:'animate__animated animate__fadeIn '
          },
          {
            src: './assets/features/categories/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,
            class:''
          }          
        ]
      }     
    },
    {
      t: `Different Varients of a product`,
      c: `You can add multiple variants of a product under that product. You can add separate image, tag and price for each variant.`,     
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/varients/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/varients/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }          
        ]
      }
    },
    {
      t: `CMS Pages`,
      c: `Each shop can change the content of their about us and terms page from their backend.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/cms/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/cms/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          },          
          {
            src: './assets/features/cms/3.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }  
        ]
      }
    },
    {
      t: `Search products`,
      c: `Customers of each shop can search and find products in that shop.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/search/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/search/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          },          
          {
            src: './assets/features/search/3.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }  
        ]
      }
    },
    {
      t: `Customizable Delivery point`,
      c: `Each shop can add their delivery spot. The delivery spot can be added as a pick up spot or as a local place.  If the delivery spot is a pickup point,then you can add its address and map url. Delivery charge, minimum order,  etc. can also be added for your each delivery spot`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/delivery-loc/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/delivery-loc/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }          
        ]
      }
    },
    {
      t: `Whatsapp Order`,
      c: `When a customer orders a product in the shop, the order details will be sent to the number of the shop as a chat app. No payment is required to order the product. So if you get an order shop, you have to contact the customer and confirm it (through whatsapp / call).`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/whatsapp-order/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/whatsapp-order/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }          
        ]
      }
    },
    {
      t: `Customizable Delivery Slots`,
      c: `Delivery time slot can be added to each shop if required. Then the customer can select that time slot and order the product for delivery.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/delivery-slots/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },
          {
            src: './assets/features/delivery-slots/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          },
          {
            src: './assets/features/delivery-slots/3.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0            
          }  
        ]
      }
    },
    {
      t: `PWA ( Prograsive Web Apps )`,
      c: `Using this customer / shop owner can install this app in mobile or desktop. It gives app like feel`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/pwa/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },          
        ]
      }
    },
    {
      t: `Customise Design`,
      c: `Each shop admin can set the theme, banner, logo and favicon of their shop. It can also be changed once you set.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/custom-design/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          }, 
          {
            src: './assets/features/custom-design/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },          
        ]
      }
    },
    {
      t: `Chat Bot`,
      c: `Each shop has its own chat bot so using this bot a cutsomer can interact with your shop and also a shop admin will get a help from bot to manage your site.`,
      svg:{
        id: 'product-categorisation',
        width: 281,
        height: 429,
        viewBox: '0 0 281 429',
        images:[
          {
            src: './assets/features/chat-bot/1.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          }, 
          {
            src: './assets/features/chat-bot/2.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },          
          {
            src: './assets/features/chat-bot/3.png',
            height: 429,
            width: 281,
            x: 0,
            y: 0,            
          },   
        ]
      }
    },
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
