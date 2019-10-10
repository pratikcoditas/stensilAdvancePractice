import { Component, h, State , Event, EventEmitter} from "@stencil/core";
import { PR_API_KEY } from "../../global/global";

@Component({
    tag:"pr-stock-finder",
    styleUrl: "./stock-finder.css"
})
export class StockFinderr {
    
    stockNameInput: HTMLInputElement;
    
    @Event({bubbles:true, composed: true}) prSymbolSelected: EventEmitter<string>;
    
    @State() searchResult: {symbol: string, name: string}[] = [];

    onFindStocks() {
        event.preventDefault();
        console.log("In find stocks");
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName }&apikey=${PR_API_KEY}`)
        .then(res =>{ return res.json()})
        .then((responseData) => {
            this.searchResult = responseData['bestMatches'].map(match => {
                return {name : match['2. name'], symbol: match['1. symbol']};
            })
            console.log(this.searchResult);
        }).catch(err => {
            console.log(err);
        })
    }

    onSelectSymbol(symbol: string) {
        this.prSymbolSelected.emit(symbol);
    }
    render() {
        return [  <form onSubmit={this.onFindStocks.bind(this)}>
            <input
              id="stock-symbol"
              ref={el => (this.stockNameInput = el)}
            />
            <button type="submit">
              Find!!!
            </button>
          </form>, <ul>
              {
                  this.searchResult.map( result => (
                      <li onClick={this.onSelectSymbol.bind(this,result.symbol)}><strong>{result.symbol}</strong>---{result.name}</li>
                  ))
              }
          </ul>]
    }
}