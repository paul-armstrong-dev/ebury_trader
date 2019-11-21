import React from "react";
import axios from "axios";
import { Button } from 'reactstrap';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BootstrapSelect from "./dd_v2";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import { Container, Row, Col } from 'reactstrap';

// import converter from "./converter.css";

  class Converter extends React.Component {
    constructor(props) {

      super(props);
      this.changeValue=this.changeValue.bind(this);

      this.state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        rate: 0.0,
        all_currencies: [],
        dropDownValue: 'Select action',
        dropdownOpen: false,
      }


    }

//     toggle(event) {
//        this.setState({
//            dropdownOpen: !this.state.dropdownOpen
//        });
//    }

    changeValue(event) {
        console.log("here")
        let id = event.currentTarget.getAttribute("id");
        if (id==="sell")
        {console.log("done")}
        let name = event.currentTarget.getAttribute("name");
        let value = event.currentTarget.getAttribute("value");
        let key = event.currentTarget.getAttribute("key");
        this.setState({
              dropDownValue: event.currentTarget.textContent,
              rate: value,
              currency: name
            })
        console.log("id-" + id);
        console.log("name-" + name);
        console.log("value-" + value);
        console.log("key-" + key);

    }

    // Populate
    componentDidMount() {
      axios
        .get("https://api.exchangeratesapi.io/latest")
        .then(response => {
          this.setState({all_currencies: response.data.rates})
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
      console.log(event)
      this.getResult()

      if (event.target.name === "from") {
        this.setState({ fromCurrency: event.target.value, result:event.target.value})
        // this.setState({ result:event.target.value})
      }

        if (event.target.name === "to") {
          this.setState(
              { toCurrency: event.target.value, result:event.target.value})
        }

      if (event.target.name === "in_amount")
      {
        this.setState({amount:event.target.value})
      }

    };
    render() {
      return (
          <Container>
            <Row>
                <Col>
                    <h2>New Trade<span role="img" aria-label="">&#x1f4b5;</span>  </h2>
                </Col>
              <Col></Col>
              <Col>
                  <div id="div_in_currency" onClick={event=> this.changeValue(event)}>
                  <BootstrapSelect id="input_select"></BootstrapSelect>
                </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
              <Row>
                  <Col>
                      Sell currency
                  </Col>
                  <Col></Col>
                  <Col>
                      Rate
                  </Col>
                  <Col></Col>
                  <Col>
                      Buy currency
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <div id="div_in_currency" onClick={event=> this.changeValue(event)}>
                          <BootstrapSelect id="input_select"></BootstrapSelect>
                      </div>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu id="sell">
                              {Object.keys(this.state.all_currencies).map(key =><DropdownItem
                                      id={"sell"}
                                      name={key}
                                      key={this.state.all_currencies[key]}
                                      value={this.state.all_currencies[key]}
                                      onClick={event=> this.changeValue(event)}>
                                      {key}
                              </DropdownItem>)}
                          </DropdownMenu>
                      </ButtonDropdown>
                  </Col>
                  <Col>&#x276F;</Col>
                  <Col>{this.state.rate && <h3>{this.state.rate}</h3>}</Col>
                  <Col>&#x276F;</Col>
                  <Col>
                      <ButtonDropdown
                          isOpen={this.state.dropdownOpen}
                          toggle={this.toggle}
                          size={"lg"}
                          color={"primary"}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu id="sell">
                              {Object.keys(this.state.all_currencies).map(key =><DropdownItem
                                      id={"sell"}
                                      name={key}
                                      key={this.state.all_currencies[key]}
                                      value={this.state.all_currencies[key]}
                                      onClick={event=> this.changeValue(event)}>
                                      {key}
                              </DropdownItem>
                              )}
                          </DropdownMenu>
                      </ButtonDropdown>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      Sell amount
                  </Col>
                  <Col>
                  </Col>
                  <Col>
                      Buy amount
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <input
                          name="in_amount"
                          type="text"
                          value={this.state.amount}
                          onChange={event => this.convertHandler(event)}
                      />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                      <Col>{this.state.result && <h3>{this.state.result}</h3>}</Col>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <Button color={"primary"} size="lg">Cancel</Button>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                      <Button color={"primary"}size="lg">Create</Button>
                  </Col>
              </Row>
          </Container>
      );
    }
  }
  export default Converter;