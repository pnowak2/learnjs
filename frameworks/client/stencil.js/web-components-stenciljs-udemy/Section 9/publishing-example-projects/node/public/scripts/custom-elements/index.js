import { attachShadow, h, createEvent, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

const spinnerCss = ".lds-hourglass{display:inline-block;position:relative;width:80px;height:80px}.lds-hourglass:after{content:\" \";display:block;border-radius:50%;width:0;height:0;margin:8px;box-sizing:border-box;border:32px solid #cef;border-color:#cef transparent #cef transparent;animation:lds-hourglass 1.2s infinite}@keyframes lds-hourglass{0%{transform:rotate(0);animation-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}50%{transform:rotate(900deg);animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}100%{transform:rotate(1800deg)}}";

const Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("div", { class: "lds-hourglass" }));
  }
  static get style() { return spinnerCss; }
};

const AV_API_KEY = "BCVPOVY5B1JRO74R";

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}form button:hover,form button:active{background:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background:#999;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

const StockFinder = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
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
    let content = h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name))));
    if (this.loading) {
      content = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { autocomplete: "off", ref: el => this.stockNameInput = el, id: "stock-symbol" }), h("button", { type: "submit" }, "Find!")),
      h("ul", null, content)
    ];
  }
  static get style() { return stockFinderCss; }
};

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:var(--color-primary, black);color:white;cursor:pointer}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#999;cursor:not-allowed}";

const StockPrice = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
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
      dataContent = h("p", null, "Price: $", this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return (h(Host, { class: this.error ? 'error' : '' }, h("form", { onSubmit: this.onFetchStockPrice }, h("input", { autocomplete: "off", ref: el => this.stockInput = el, id: "stock-symbol", value: this.stockUserInput, onInput: this.onUserInput }), h("button", { disabled: !this.stockInputValid || this.loading, type: "submit" }, "Fetch")), h("div", null, " ", dataContent, " ")));
  }
  get el() { return this; }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
};

const UcSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"uc-spinner"]);
const UcStockFinder = /*@__PURE__*/proxyCustomElement(StockFinder, [1,"uc-stock-finder",{"loading":[32],"searchResults":[32]}]);
const UcStockPrice = /*@__PURE__*/proxyCustomElement(StockPrice, [1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      UcSpinner,
  UcStockFinder,
  UcStockPrice
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { UcSpinner, UcStockFinder, UcStockPrice, defineCustomElements };
