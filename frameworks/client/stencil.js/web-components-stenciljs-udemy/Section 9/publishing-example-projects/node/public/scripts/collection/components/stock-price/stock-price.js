import { Component, Host, h, Element, State, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
    this.fetchedPrice = 0;
    this.stockInputValid = false;
    this.loading = false;
    this.onFetchStockPrice = (event) => {
      event.preventDefault();
      // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
      this.stockSymbol = this.stockInput.value;
    };
    this.onUserInput = (evt) => {
      this.stockUserInput = evt.target.value;
      if (this.stockUserInput.trim() !== '') {
        this.stockInputValid = true;
      }
      else {
        this.stockInputValid = false;
      }
    };
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  componentWillLoad() {
    console.log('component will load');
    console.log(this.stockSymbol);
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentDidLoad() {
    console.log('component did load');
  }
  componentWillUpdate() {
    console.log('component will update');
  }
  componentDidUpdate() {
    console.log('component did update');
    // if(this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  disconnectedCallback() {
    console.log('component did unload');
  }
  onStockSymbolSelected(evt) {
    console.log('stock symbol selected', evt.detail);
    if (evt.detail && evt.detail !== this.stockSymbol) {
      this.stockSymbol = evt.detail;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid');
      }
      return res.json();
    })
      .then(parsedRes => {
      if (!parsedRes['Global Quote']['05. price']) {
        throw new Error('Invalid symbol!');
      }
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      this.error = null;
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }
  // hostData() {
  //   return {
  //     class: this.error ? 'error hydrated' : 'hydrated',
  //   }
  // }
  render() {
    let dataContent = h("p", null, "Please enter a symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchedPrice) {
      dataContent = h("p", null,
        "Price: $",
        this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return (h(Host, { class: this.error ? 'error' : '' },
      h("form", { onSubmit: this.onFetchStockPrice },
        h("input", { autocomplete: "off", ref: el => this.stockInput = el, id: "stock-symbol", value: this.stockUserInput, onInput: this.onUserInput }),
        h("button", { disabled: !this.stockInputValid || this.loading, type: "submit" }, "Fetch")),
      h("div", null,
        " ",
        dataContent,
        " ")));
  }
  static get is() { return "uc-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbol": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "stock-symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "fetchedPrice": {},
    "stockUserInput": {},
    "stockInputValid": {},
    "error": {},
    "loading": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "stockSymbol",
      "methodName": "stockSymbolChanged"
    }]; }
  static get listeners() { return [{
      "name": "ucSymbolSelected",
      "method": "onStockSymbolSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
