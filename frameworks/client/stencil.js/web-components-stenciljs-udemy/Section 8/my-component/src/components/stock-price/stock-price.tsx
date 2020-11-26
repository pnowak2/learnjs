import { Component, Host, h, Element, State, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global'

@Component({
  tag: 'uc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class StockPrice {
  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  @State() fetchedPrice: number = 0;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Element() el: HTMLElement;

  // initialStockSymbol: string;
  stockInput: HTMLInputElement;

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

  onFetchStockPrice = (event: Event) => {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
  }

  @Listen('ucSymbolSelected', { target: 'body' })
  onStockSymbolSelected(evt: CustomEvent) {
    console.log('stock symbol selected', evt.detail);
    if (evt.detail && evt.detail !== this.stockSymbol) {
      this.stockSymbol = evt.detail;
    }
  }

  onUserInput = (evt: Event) => {
    this.stockUserInput = (evt.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  fetchStockPrice(stockSymbol: string) {
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
    let dataContent = <p>Please enter a symbol</p>;

    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }

    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }

    if (this.loading) {
      dataContent = <uc-spinner></uc-spinner>;
    }

    return (
      <Host class={this.error ? 'error' : ''}>
        <form onSubmit={this.onFetchStockPrice}>
          <input
            autocomplete="off"
            ref={el => this.stockInput = el}
            id="stock-symbol"
            value={this.stockUserInput}
            onInput={this.onUserInput} />
          <button disabled={!this.stockInputValid || this.loading} type="submit">Fetch</button>
        </form>
        <div> {dataContent} </div>
      </Host>
    )
  }
}
