import React from "react";
import axios from "axios";
import { Button } from 'reactstrap';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BootstrapSelect from "./dd_v2";

// import converter from "./converter.css";

  class Converter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        rate: 0.0,
        currencies: []
      };
    }
    // Populate
    componentDidMount() {
      axios
        .get("https://api.exchangeratesapi.io/latest")
        .then(response => {
          const currencyAr = ["EUR"];
          for (const key in response.data.rates) {
            currencyAr.push(key);
          }
          this.setState({ currencies: currencyAr });
        })
        .catch(err => {
          console.log("oppps", err);
        });
    }

    convertCurrency = () => {
      if (this.state.fromCurrency !== this.state.toCurrency) {
        console.log("hi")
      }
      return "hi2"
    }
    getResult = () => {
      if (this.state.fromCurrency !== this.state.toCurrency) {
        if (this.state.fromCurrency !== this.state.toCurrency) {
          axios
              .get(
                  `https://api.exchangeratesapi.io/latest?base=${
                      this.state.fromCurrency
                  }&symbols=${this.state.toCurrency}`
              )
              .then(response => {
                const rate = response.data.rates[this.state.toCurrency]
                const result =
                    this.state.amount * rate;

                this.setState({result: result.toFixed(5), rate: rate});
              })
              .catch(error => {
                console.log("Opps", error.message);
              });
        } else {
          this.setState({result: "You cant convert the same currency!"});
        }
      }
    }
    // Handle change
    convertHandler = (event) => {
      console.log(event.target.name)
      this.getResult()

      if (event.target.name === "from") {
        this.setState({ fromCurrency: event.target.value, result:event.target.value})
        // this.setState({ result:event.target.value})
      }

        if (event.target.name === "to") {
          this.setState(
              { toCurrency: event.target.value, result:event.target.value})
        }

      if (event.target.name === "amount")
      {this.setState({amount:event.target.value})}

    };
    render() {
      return (
        <div className="Converter">
          <h2>
            <span>New Trade</span>
            <span role="img" aria-label="money">
              &#x1f4b5;
            </span>
          </h2>
          <div className="From">
            <span>Sell amount</span>
            <input
              name="amount"
              type="text"
              value={this.state.amount}
              onChange={event => this.convertHandler(event)}
            />
            <span>  </span>
            <h5>Rate</h5>
            <h3>{this.state.rate}</h3>
            <select
              name="from"
              onChange={event => this.convertHandler(event)}
              value={this.state.fromCurrency}
            >
              {this.state.currencies.map(cur => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
            <span> </span>
            <h5>Buy currency</h5>
            <select
              name="to"
              onChange={event => this.convertHandler(event)}
              value={this.state.toCurrency}
            >
              {this.state.currencies.map(cur => (
                <option key={cur}>{cur}</option>
              ))}
            </select>

            <span>{this.state.result && <h3>{this.state.result}</h3>}
            </span>
            <span aria-atomic={"true"}>
              <Button color={"primary"}>Store trade</Button>
            </span>
          </div>
          <BootstrapSelect name={"From"} onChange={event => this.convertHandler(event)} value={this.state.toCurrency}></BootstrapSelect>
          <BootstrapSelect name={"To"} onChange={event => this.convertHandler(event)} value={this.state.toCurrency}></BootstrapSelect>
        </div>
      );
    }
  }
  export default Converter;