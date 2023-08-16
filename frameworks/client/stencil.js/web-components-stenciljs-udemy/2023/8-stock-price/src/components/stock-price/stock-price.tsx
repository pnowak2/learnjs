import { Component, Element, State, h } from "@stencil/core"
import { AV_API_KEY } from "../../utils/utils";

@Component({
  tag: 'eui-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class EuiStockPrice {
  stockInput: HTMLInputElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() error: string;
  @State() stockInputValid: boolean = false;

  @Element() el: Element;

  onUserInput(evt: Event) {
    this.stockUserInput = (evt.target as HTMLInputElement).value;
    if(this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(evt: Event) {
    evt.preventDefault();

    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    // const stockSymbol = this.stockInput.value;
    const stockSymbol = this.stockUserInput;

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if(!json['Global Quote']['05. price']) {
          throw new Error('Invalid symbol');
        }
        this.error = null;

        this.fetchedPrice = +json['Global Quote']['05. price'];
      })
      .catch(err => {
        this.error = err.message;
      })
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if(this.error) {
      dataContent = <p>{this.error}</p>
    } else if(this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice || '--'}</p>
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" 
          ref={ el => this.stockInput = el } 
          value={this.stockUserInput} 
          onInput={this.onUserInput.bind(this)}/>
        <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
      </form>,

      <div>
        {dataContent}
      </div>
    ];
  }
}