import { Component, Input, OnInit } from '@angular/core';
import { ShopProduct } from 'src/app/lib/interfaces';
import { ProductTag } from '../interfaces';

@Component({
  selector: 'app-product-tag-chip',
  templateUrl: './product-tag-chip.component.html',
  styleUrls: ['./product-tag-chip.component.scss']
})
export class ProductTagChipComponent implements OnInit {
  @Input() product: ShopProduct & { shop_product_tag?: ProductTag[]}
  constructor() { }

  ngOnInit(): void {

  }

}
