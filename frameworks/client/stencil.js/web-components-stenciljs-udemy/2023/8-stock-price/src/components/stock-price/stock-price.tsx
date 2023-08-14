import { Component, State, h } from "@stencil/core"
import { AV_API_KEY } from "../../utils/utils";

@Component({
  tag: 'eui-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class EuiStockPrice {
  @State() fetchedPrice: number;

  onFetchStockPrice(evt: Event) {
    evt.preventDefault();

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.fetchedPrice = +json['Global Quote']['05. price'];
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,

      <div>
        <p>Price: ${this.fetchedPrice || '--'}</p>
      </div>
    ];
  }
}