import { EventEmitter } from '../../stencil-public-runtime';
export declare class StockFinder {
  loading: boolean;
  searchResults: Array<{
    symbol: string;
    name: string;
  }>;
  ucSymbolSelected: EventEmitter<string>;
  stockNameInput: HTMLInputElement;
  onFindStocks(evt: Event): void;
  onSelectSymbol(symbol: string): void;
  render(): any[];
}
