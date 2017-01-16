import {
  Component,
  EventEmitter
} from '@angular/core';

import { NgModule, Input, Output } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

/**
 * Provides a `Product` object
 */
class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number) {
  }
}

@Component({
  selector: 'inventory-app',
  template: `
  <div class="inventory-app">
    <products-list
      [productList]="products"
      (onProductSelected)="productWasSelected($event)">
    </products-list>
  </div>
  `
})
class InventoryApp {
  products: Array<Product>;

  constructor() {
    this.products = [
      new Product(
        'ASSMALNG',
        'Assmal Next Generation',
        '/resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        129.99),
      new Product(
        'ASSMAL2',
        'Assmal Current Generation',
        '/resources/images/products/black-hat.jpg',
        ['Woman', 'Shoes', 'Running Shoes'],
        229.99),
      new Product(
        'ASSMAL One',
        'Assmal Old Generation',
        '/resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        329.99)
    ];
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ' + product);
  }
}

@Component({
  selector: 'products-list',
  inputs: ['productList'],
  outputs: ['onProductSelected'],
  template: `
    <div class="ui items">
      <product-row
        *ngFor="let myProduct of productList"
        [product]="myProduct"
        (click)="clicked(myProduct)"
        [class.selected] = "isSelected(myProduct)">
      </product-row>
    </div>
  `
})
class ProductsList {
  productList: Array<Product>;
  onProductSelected: EventEmitter<Product>;
  private currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product) {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product) {
    if(!product || !this.currentProduct) {
      return false;
    }

    return product.sku === this.currentProduct.sku;
  }
}

@NgModule({
  declarations: [
    InventoryApp,
    ProductsList
  ],
  imports: [BrowserModule],
  bootstrap: [InventoryApp]
})
class InventoryAppModule { }

platformBrowserDynamic().bootstrapModule(InventoryAppModule);

