import { Component, Element, State, h, Prop, Watch, Listen } from "@stencil/core"
import { AV_API_KEY } from "../../utils/utils";

@Component({
  tag: 'eui-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class EuiStockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;

  @Prop({ mutable: true, reflect: true}) stockSymbol: string;

  @State() loading: boolean = false;
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() error: string;
  @State() stockInputValid: boolean = false;

  @Listen('euiSymbolSelected', { target: 'body' })
  onSymbolSelected(evt: CustomEvent) {
    console.log('evt', evt.detail);
    if(evt.detail) {
      this.fetchStockPrice(evt.detail);
      this.stockUserInput = evt.detail;
    }
  }

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    this.stockUserInput = newValue;
    this.fetchStockPrice(newValue);
  }

  @Element() el: Element;

  onUserInput(evt: Event) {
    this.stockUserInput = (evt.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(evt: Event) {
    evt.preventDefault();

    this.stockSymbol = this.stockUserInput
  }

  componentWillLoad() {
    console.log('will load, can still change @state property, render will use it');
    console.log(this.stockSymbol);
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
    console.log('did load');
    console.log('changing @state property will call render again, performance note');
  }

  componentWillUpdate() {
    console.log('will update, property changed');
  }
  
  componentDidUpdate() {
    console.log('did update, property changed');
  }

  disconnectedCallback() {
    console.log('did unload');
  }

  fetchStockPrice(stockSymbol: string) {
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    // const stockSymbol = this.stockInput.value;
    this.loading = true;

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (!json['Global Quote']['05. price']) {
          throw new Error('Invalid symbol');
        }
        this.error = null;

        this.fetchedPrice = +json['Global Quote']['05. price'];
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      })
  }

  hostData() {
    return {
      class: this.error ? 'error' : ''
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>
    } else if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice || '--'}</p>
    } else if (this.loading) {
      dataContent = <eui-spinner></eui-spinner>
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,

      <div>
        {dataContent}
      </div>
    ];
  }
}