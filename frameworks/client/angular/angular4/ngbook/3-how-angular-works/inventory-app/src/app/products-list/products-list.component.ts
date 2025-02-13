import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../product.model';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productList: Product[];
  @Output() onProductSelected = new EventEmitter<Product>();
  private currentProduct: Product;

  constructor() { }

  ngOnInit() {
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

  didClickProduct(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.next(product);
  }
}
