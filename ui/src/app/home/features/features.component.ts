import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  faHandPointRight = faHandPointRight;

  item:{t: string, c: string}[] = [
    {
      t: `Product Categorisation`,
      c: `You can categorize and list your product.`
    },
    {
      t: `Different Varients of a product`,
      c: `You can add multiple variants of a product under that product. You can add separate image, tag and price for each variant.`
    },
    {
      t: `CMS Pages`,
      c: `Each shop can change the content of their about us and terms page from their backend.`
    },
    {
      t: `Search products`,
      c: `Customers of each shop can search and find products in that shop.`
    },
    {
      t: `Customizable Delivery point`,
      c: `Each shop can add their delivery spot. The delivery spot can be added as a pick up spot or as a local place.  If the delivery spot is a pickup point,then you can add its address and map url. Delivery charge, minimum order,  etc. can also be added for your each delivery spot`
    },
    {
      t: `Whatsapp Order`,
      c: `When a customer orders a product in the shop, the order details will be sent to the number of the shop as a chat app. No payment is required to order the product. So if you get an order shop, you have to contact the customer and confirm it (through whatsapp / call).`
    },
    {
      t: `Customizable Delivery Slots`,
      c: `Delivery time slot can be added to each shop if required. Then the customer can select that time slot and order the product for delivery.`
    },
    {
      t: `PWA ( Prograsive Web Apps )`,
      c: `Using this customer / shop owner can install this app in mobile or desktop. It gives app like feel`
    },
    {
      t: `Customise Design`,
      c: `Each shop admin can set the theme, banner, logo and favicon of their shop. It can also be changed once you set.`
    },
    {
      t: `Chat Bot`,
      c: `Each shop has its own chat bot so using this bot a cutsomer can interact with your shop and also a shop admin will get a help from bot to manage your site.`
    },
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
