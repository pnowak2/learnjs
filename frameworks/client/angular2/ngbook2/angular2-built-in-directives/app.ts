import {
  Component,
  EventEmitter
} from '@angular/core';

import { NgModule, Input, Output } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
  selector: 'directives',
  template: `
  <h1>NgIf</h1>
  <ng-if></ng-if>

  <h1>NgSwitch</h1>
  <ng-switch></ng-switch>

  <h1>NgStyle</h1>
  <ng-style></ng-style>

  <h1>NgClass</h1>
  <ng-class></ng-class>

  <h1>NgFor</h1>
  <ng-for></ng-for>

  <h1>NgNonBindable</h1>
  <ng-nonBindable></ng-nonBindable>
  `
})
class Directives { }

@Component({
  selector: 'ng-if',
  template: `
    <div *ngIf="false">I'm not visible</div>
    <div *ngIf="a > b">I'm visible because a > b</div>
    <div *ngIf="str === 'yes'">I'm visible because str === 'yes'</div>
  `
})
class NgIf {
  a: number;
  b: number;
  str: string;

  constructor() {
    this.a = 6;
    this.b = 5;
    this.str = 'yes';
  }
}

@Component({
  selector: 'ng-switch',
  template: `
    <div class="container" [ngSwitch]="myVar">
      <div *ngSwitchCase="'A'">Var is A</div>
      <div *ngSwitchCase="'B'">Var is B</div>
      <div *ngSwitchCase="'C'">Var is C</div>
      <div *ngSwitchCase="'C'">Var is another C</div>
      <div *ngSwitchDefault>Var is something else</div>
    </div>
  `
})
class NgSwitch {
  myVar: string;

  constructor() {
    this.myVar = 'C';
  }
}

@Component({
  selector: 'ng-style',
  template: `
    <div [style.background-color]="'yellow'">
      Uses yellow background color
    </div>

    <div [ngStyle]="{ color: 'white', 'background-color': 'blue' }">
      Uses white and blue colors
    </div>

    <div class="ui input">
      <input type="text" name="color" value="{{color}}" #colorinput>
    </div>

    <div class="ui input">
      <input type="text" name="fontSize" value="{{fontSize}}" #fontinput>
    </div>

    <button class="ui primary button" (click)="apply(colorinput.value, fontinput.value)">
      Apply settings
    </button>

    <h4 class="ui horizontal divider header">
      ngStyle with object property from variable
    </h4>

    <div>
      <span [ngStyle]="{color: color, 'font-size': fontSize}">
        {{ color }} text
      </span>
    </div>

    <h4 class="ui horizontal divider header">
      style from variable
    </h4>

    <div>
      <span [style.background-color]="color"
            style="color: #ccc;">
        {{ color }} background
      </span>
    </div>
  `
})
class NgStyle {
  color: string;
  fontSize: number;

  apply(color: string, fontSize: number) {
    this.color = color;
    this.fontSize = fontSize;
  }
}

@Component({
  selector: 'ng-class',
  template: `
    <div [ngClass]="{bordered: true}">With bordered class</div>
    <div [ngClass]="{bordered: false}">Without bordered class</div>
    <div [ngClass]="{bordered: isBordered}">Dynamically bordered class, border is {{ isBordered ? 'ON' : 'OFF' }}</div>
    <div [ngClass]="classesObj">Dynamically with classes object</div>
    <div [ngClass]="classesArr">Dynamically with classes array</div>
  `
})
class NgClass {
  isBordered: boolean;
  classesObj: Object;
  classesArr: Array<string>;

  constructor() {
    this.isBordered = true;
    this.classesObj = {
      bordered: true
    }
    this.classesArr = ['bordered'];
  }
}

@Component({
  selector: 'ng-for',
  template: `
    <h4 class="ui horizontal divider header">
      Simple list of strings
    </h4>

    <div class="ui list" *ngFor="let city of cities">
      <div class="item">{{ city }}</div>
    </div>

    <h4 class="ui horizontal divider header">
      List of objects
    </h4>

    <table class="ui celled table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tr *ngFor="let person of people; let num = index">
        <td>{{ num + 1}}</td>
        <td>{{ person.name }}</td>
        <td>{{ person.age }}</td>
        <td>{{ person.city }}</td>
      </tr>
    </table>
  `
})
class NgFor {
  cities: Array<string>;
  people: Array<Object>;

  constructor() {
    this.cities = ['Miami', 'Sao Paulo', 'New York'];
    this.people = [
      { name: 'Anderson', age: 35, city: 'Sao Paulo' },
      { name: 'John', age: 12, city: 'Miami' },
      { name: 'Peter', age: 22, city: 'New York' }
    ];
  }
}

@Component({
  selector: 'ng-nonBindable',
  template: `
    <div class="ngNonBindableDemo">
      <span class="bordered">{{ content }}</span><br/>
      <span class="pre" ngNonBindable>
        {{ content }}
      </span>
    </div>
  `
})
class NgNonBindable {
  content: string = 'test';
}

@NgModule({
  declarations: [
    Directives,
    NgIf,
    NgSwitch,
    NgStyle,
    NgClass,
    NgFor,
    NgNonBindable
  ],
  imports: [BrowserModule],
  bootstrap: [Directives]
})
class NGBuiltInDirectives { }

platformBrowserDynamic().bootstrapModule(NGBuiltInDirectives);

