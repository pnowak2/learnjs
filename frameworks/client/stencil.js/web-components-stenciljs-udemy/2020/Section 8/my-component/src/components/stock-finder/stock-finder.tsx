import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true
})
export class StockFinder {
  @State() loading = false;
  @State() searchResults: Array<{ symbol: string, name: string }> = [];
  @Event({ bubbles: true, composed: true }) ucSymbolSelected: EventEmitter<string>;

  stockNameInput: HTMLInputElement;

  onFindStocks(evt: Event) {
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
      })
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }

  render() {
    let content = <ul>{this.searchResults.map(result => (
      <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
        <strong>{result.symbol}</strong> - {result.name}
      </li>
    ))}</ul>;

    if (this.loading) {
      content = <uc-spinner></uc-spinner>
    }

    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input
          autocomplete="off"
          ref={el => this.stockNameInput = el}
          id="stock-symbol" />
        <button type="submit">Find!</button>
      </form>,
      <ul>
        {content}
      </ul>
    ]
  }
}
