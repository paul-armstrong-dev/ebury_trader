import React from "react";
import axios from "axios";
import {  Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import { Container, Row, Col } from 'reactstrap';
import { Input } from "./input"
import BootstrapSelect from "./dropdown"

  class NewTrade extends React.Component {
      constructor(props) {
          super(props);
          this.componentWillMount = this.componentWillMount.bind(this);
          this.toggle = this.toggle.bind(this);
          this.changeValue = this.changeValue.bind(this);

          this.state = {
              result: null,
              fromCurrency: "",
              toCurrency: "",
              amount: null,
              rate: 0.0,
              all_currencies: [],
              fromDropdownOpen: true,
              fromDropDownValue: 'Select action',
              toDropdownOpen: false,
              fromDropdownValue: 'Select action',
          }
      };

    componentWillMount() {
      axios
              .get(`https://api.exchangeratesapi.io/latest?`)
              .then(response => {
                this.setState({all_currencies: response.data.rates})
              })
              .catch(error => {
                console.log("Opps", error.message);
              });
      }

      toggle(event) {
        console.log("here")
        console.log(event)
        this.setState({
            fromDropDownValue: !this.state.fromDropDownValue
        });
    }

    changeValue(event) {
        console.log(event)
        this.setState({
            fromDropdownOpen: !this.state.fromDropdownOpen
        });
    }

      render() {
        const allCurrencies = this.state.all_currencies;
        const fromDropdownOpen = this.state.fromDropdownOpen;
        const fromDownDownValue = this.state.fromDropDownValue;
        return (
            <div>
            <BootstrapSelect dropDownValue={fromDownDownValue}
                             dropDownOpen={fromDropdownOpen}
                             allCurrencies={allCurrencies}
                             changeValue={this.changeValue}
                             toggle={this.toggle}>

            </BootstrapSelect>
            </div>
        )
      }
  }

  export default NewTrade