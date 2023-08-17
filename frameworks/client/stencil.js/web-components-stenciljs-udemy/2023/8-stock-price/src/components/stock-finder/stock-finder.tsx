import { Component, Event, EventEmitter, State, h } from "@stencil/core";
import { AV_API_KEY } from "../../utils/utils";
import { result } from "@stencil/core/internal/utils";

@Component({
    tag: 'eui-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {
    @State() searchResults: Array<{symbol: string, name: string}> = [];

    @Event({ bubbles: true, composed: true }) euiSymbolSelected: EventEmitter<string>;

    stockNameInput: HTMLInputElement;

    onFindStocks(evt: Event) {
        evt.preventDefault();
        const stockName = this.stockNameInput.value;

        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(json => {
                this.searchResults = json['bestMatches'].map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol']}
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSelectSymbol(symbol: string) {
        this.euiSymbolSelected.emit(symbol);
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input id="stock-symbol"
                    ref={el => this.stockNameInput = el}
                />
                <button type="submit">
                    Find
                </button>
            </form>,
            <ul>
                { this.searchResults.map(result => (
                    <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol} - </strong>{result.name}</li>
                ))}
            </ul>
        ]
    }
}