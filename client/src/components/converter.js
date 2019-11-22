import React from "react";
import axios from "axios";
import {  Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import { Container, Row, Col } from 'reactstrap';
import Form from "reactstrap/es/Form";

// import converter from "./converter.css";

  class Converter extends React.Component {
    constructor(props) {

      super(props);
      this.changeValue=this.changeValue.bind(this);
      this.toggle_s=this.toggle_s.bind(this)
      this.selectSellCurrency=this.selectSellCurrency.bind(this)
      this.selectBuyCurrency=this.selectBuyCurrency.bind(this)
      this.toggle_b=this.toggle_b.bind(this)
      this.state = {
          result: null,
          fromCurrency: "",
          toCurrency: "",
          amount: 0,
          rate: 0.0,
          all_currencies: [],
          s_dropDownValue: 'Select currency',
          b_dropDownValue: 'Select currency',
          s_dropdownOpen: false,
          b_dropdownOpen: false,
          disable_input: true
      }
    }

     toggle_s(event) {
        this.setState({
            s_dropdownOpen: !this.state.s_dropdownOpen
        });
    }
     toggle_b(event) {
        this.setState({
            b_dropdownOpen: !this.state.b_dropdownOpen
        });
    }

    changeValue(event) {
        let id = event.target.getAttribute("id");
        console.log(id)
        console.log("hi")
        if (id==="sell_field")
        {
            let name = event.target.getAttribute("name");
            // let value = event.target.getAttribute("value");

            this.setState({
              s_dropDownValue: event.target.textContent,
              // rate: value,
              fromCurrency: name
            });
            console.log("done")
        }
        else if(id==="buy_field")
        {
            let name = event.target.getAttribute("name");
            let value = event.target.getAttribute("value");

            this.setState({
                b_dropDownValue: event.target.textContent,
                rate: value,
                toCurrency: name,
                // Really hate this property naming, disable = false?
                disable_input: false
            });
            this.getResult();

            this.convertCurrency()
        }
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
        if (this.state.fromCurrency !== this.state.toCurrency)
        {
            console.log(this.state.fromCurrency);
            console.log(this.state.toCurrency)
        }
    };

    getResult = () => {
        if (this.state.fromCurrency && this.state.fromCurrency.length &&
        this.state.toCurrency && this.state.toCurrency.length ) {
      if (this.state.fromCurrency !== this.state.toCurrency) {
        if (this.state.fromCurrency !== this.state.toCurrency) {
          axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)
              .then(response => {
                const rate = response.data.rates[this.state.toCurrency];
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
        }else {
          this.setState({result: "Please select both currencies"});
        }
    };
    selectSellCurrency = (event) => {
        let name = event.target.getAttribute("name");
        // let value = event.target.getAttribute("value");

        this.setState({
            s_dropDownValue: event.target.textContent,
            fromCurrency: name
            })};


    selectBuyCurrency = (event) => {
            let name = event.target.getAttribute("name");
            this.setState({
                b_dropDownValue: event.target.textContent,
                toCurrency: name,
                // Really hate this property naming, disable = false?
                disable_input: false
            });
            console.log(this.state.fromCurrency);
            console.log(this.state.toCurrency)
    };
    // Handle change
    convertHandler = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);

        if (event.target) {
            if (event.target.name === "from") {
                this.setState({fromCurrency: event.target.value, result: event.target.value})
            }
           if (event.target.name === "to") {
                this.setState(
                    {toCurrency: event.target.value, result: event.target.value})
            }
            if (event.target.name === "in_amount") {

                this.setState({amount: event.target.value})
            }
        }
    };
    render() {
        const amount = this.state.amount;

      return (
          <Form>
          <Container>
            <Row>
                <Col>
                    <h2>New Trade<span role="img" aria-label="">&#x1f4b5;</span>  </h2>
                </Col>
              <Col></Col>
              <Col>

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
          </Container>
              <Container>
              <Row>
                  <Col>
                     <ButtonDropdown isOpen={this.state.s_dropdownOpen} toggle={this.toggle_s}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {this.state.s_dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu id="sell_menu">
                              {Object.keys(this.state.all_currencies).map(key =><DropdownItem
                                      id={"sell_field"}
                                      name={key}
                                      key={this.state.all_currencies[key]}
                                      value={this.state.all_currencies[key]}
                                      onClick={event=> this.selectSellCurrency(event)}>
                                      {key}
                              </DropdownItem>)}
                          </DropdownMenu>
                      </ButtonDropdown>
                  </Col>
                  <Col>&#x276F;</Col>
                  <Col>{this.state.rate && <h3>{this.state.rate}</h3>}</Col>
                  <Col>&#x276F;</Col>
                  <Col>
                      <ButtonDropdown isOpen={this.state.b_dropdownOpen} toggle={this.toggle_b}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {this.state.b_dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu id="buy_menu">
                              {Object.keys(this.state.all_currencies).map(key =><DropdownItem
                                      id={"buy_field"}
                                      name={key}
                                      key={this.state.all_currencies[key]}
                                      value={this.state.all_currencies[key]}
                                      onClick={event=> this.selectBuyCurrency(event)}>
                                      {key}
                              </DropdownItem>)}
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
              <Row/>
                  <Row>
                  <Col sm={{ size: 'auto', offset: 1 }}>
                      <input
                          id={"in_amount"}
                          name="in_amount"
                          type="number"
                          value={this.state.amount}
                          onChange={event => this.convertHandler(event)}
                          disabled = {(this.state.disable_input)? "disabled" : ""}
                      />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                      <Col>{this.state.result && <h3>{this.state.result}</h3>}</Col>
                  </Col>
              </Row>

              <Row>
                  <Col sm={{ size: 'auto', offset: 1 }}>
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
              <Container>
                  <Row>
                  </Row>
              </Container>

          </Form>
      );
    }
  }
  export default Converter;