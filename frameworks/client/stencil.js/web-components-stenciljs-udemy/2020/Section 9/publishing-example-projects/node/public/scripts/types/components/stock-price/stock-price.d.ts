export declare class StockPrice {
  stockSymbol: string;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  fetchedPrice: number;
  stockUserInput: string;
  stockInputValid: boolean;
  error: string;
  loading: boolean;
  el: HTMLElement;
  stockInput: HTMLInputElement;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentWillUpdate(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  onFetchStockPrice: (event: Event) => void;
  onStockSymbolSelected(evt: CustomEvent): void;
  onUserInput: (evt: Event) => void;
  fetchStockPrice(stockSymbol: string): void;
  render(): any;
}
