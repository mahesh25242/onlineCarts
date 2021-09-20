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
      c: `The shop will list their product in categorised manner. So it make easy to catch the desired product product by customer in speedy way`
    },
    {
      t: `Different Varients of a product`,
      c: `A product can add with diffret varient each varient has specifi price , image, description, and type. Using this you can add multiple varient of a product under it.`
    },
    {
      t: `CMS Pages`,
      c: `shop has 2 additional page like about Us and Contact us these 2 page content can manage by each shop.`
    },
    {
      t: `Search products`,
      c: `shop has seperate search engine to find there product so a customer can find there product in easy way`
    },
    {
      t: `Customasiabel Delivery point`,
      c: `shop has a features to manage there delivery spots , delivery change to each point, minimum order amount for each point. If it is a shop branch then it can add address and google map link there.`
    },
    {
      t: `Customasiabel Delivery Slots`,
      c: `Shop can add a delivery time slop if it has home delivery. using this we can create mutiple time slot for delivery`
    },
    {
      t: `PWA ( Prograsive Web Apps )`,
      c: `This is developed with PWA concept. using this customer / shop owner can install this app uing browser. while we done like this then that app will list in our app section in mobile`
    },
    {
      t: `Customise Design`,
      c: `Each shop can customise there design with our themes and upload banners`
    },
    {
      t: `Whatsapp Order`,
      c: `shop site not integrate any payment gate. THe payments was done with shop & customers directly`
    }
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
