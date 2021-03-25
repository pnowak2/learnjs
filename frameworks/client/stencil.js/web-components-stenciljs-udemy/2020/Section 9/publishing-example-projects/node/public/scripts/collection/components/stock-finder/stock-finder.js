import { Component, h, State, Event } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
    this.loading = false;
    this.searchResults = [];
  }
  onFindStocks(evt) {
    this.loading = true;
    evt.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(data => data.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches'].map(match => ({
        name: match['2. name'],
        symbol: match['1. symbol']
      }));
      this.loading = false;
    })
      .catch(err => {
      console.log(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    let content = h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
      h("strong", null, result.symbol),
      " - ",
      result.name))));
    if (this.loading) {
      content = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) },
        h("input", { autocomplete: "off", ref: el => this.stockNameInput = el, id: "stock-symbol" }),
        h("button", { type: "submit" }, "Find!")),
      h("ul", null, content)
    ];
  }
  static get is() { return "uc-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get states() { return {
    "loading": {},
    "searchResults": {}
  }; }
  static get events() { return [{
      "method": "ucSymbolSelected",
      "name": "ucSymbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
