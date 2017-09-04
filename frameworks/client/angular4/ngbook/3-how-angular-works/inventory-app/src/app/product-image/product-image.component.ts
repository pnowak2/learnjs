import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Product } from './../product.model';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'ui small image';
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
