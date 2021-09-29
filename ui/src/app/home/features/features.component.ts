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
      c: `The shop will list products in categorised manner. So the customers can easily catch their products.`
    },
    {
      t: `Different Varients of a product`,
      c: `Each product can add with different varients with seperate price , image, description, type etc. So no need to add as a differnt product.`
    },
    {
      t: `CMS Pages`,
      c: `shop has 2 cms page which are about Us and Contact us. The page content can manage in each shops\'s admin.`
    },
    {
      t: `Search products`,
      c: `shop has product search engine to find shop's product so a customer of a shop can easily find their needs`
    },
    {
      t: `Customizable Delivery point`,
      c: `shop has a features to manage there delivery spots , and also can set delivery charge , Minimum order amount of order to each created point . Can add shop branch as a delevry point (pick up spot) with address and map url.`
    },
    {
      t: `Customizable Delivery Slots`,
      c: `Shop can add a delivery time slots. using this we can create mutiple time slot for delivery`
    },
    {
      t: `PWA ( Prograsive Web Apps )`,
      c: `Using this customer / shop owner can install this app in mobile or desktop. while you do this then that app will list in your app section in mobile`
    },
    {
      t: `Customise Design`,
      c: `Each shop can customise there design with our customs themes , upload banners etc`
    },
    {
      t: `Whatsapp Order`,
      c: `The order was directly go to shop registered mobile using whatsapp message link`
    }
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
