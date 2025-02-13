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
        '/resources/images/products/blue-jacket.jpg',
        ['Woman', 'Shoes', 'Running Shoes'],
        229.99),
      new Product(
        'ASSMAL One',
        'Assmal Old Generation',
        '/resources/images/products/black-shoes.jpg',
        ['Men', 'Accessories', 'Hats'],
        329.99)
    ];
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ' + product.name);
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

@Component({
  selector: 'product-row',
  inputs: ['product'],
  host: { 'class': 'item' },
  template: `
    <product-image [product]="product"></product-image>
    <div class="content">
      <div class="header">{{ product.name }}</div>
      <div class="meta">
        <div class="product-sku">SKU# {{ product.sku }}</div>
      </div>
      <div class="description">
        <product-department [product]="product"></product-department>
      </div>
    </div>
    <price-display [price]="product.price"></price-display>
  `
})
class ProductRow {
  product: Product;
}

@Component({
  selector: 'product-image',
  host: { 'class': 'ui small image' },
  inputs: ['product'],
  template: `
    <img class="product-image" [src]="product.imageUrl">
  `
})
class ProductImage {
  product: Product;
}

@Component({
  selector: 'price-display',
  inputs: ['price'],
  template: `
    <div class="price-display">\${{ price }}</div>
  `
})
class PriceDisplay {
  price: number;
}

@Component({
  selector: 'product-department',
  inputs: ['product'],
  template: `
    <div class="product-department">
      <span *ngFor="let name of product.department; let i=index">
        <a href="#">{{ name }}</a>
        <span>{{i < (product.department.length - 1) ? '>' : ''}}</span>
      </span>
    </div>
  `
})
class ProductDepartment {
  product: Product;
}

@NgModule({
  declarations: [
    InventoryApp,
    ProductsList,
    ProductRow,
    ProductImage,
    PriceDisplay,
    ProductDepartment
  ],
  imports: [BrowserModule],
  bootstrap: [InventoryApp]
})
class InventoryAppModule { }

platformBrowserDynamic().bootstrapModule(InventoryAppModule);

