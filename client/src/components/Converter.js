import React from 'react';
import CurrencyInput from "./currency/CurrencyInput";
import CurrencyResult from "./currency/CurrencyResult";
import CurrencySelect from "./currency/CurrencySelect";
import {addTrade, getLatestRates} from "./requests";
import axios from "axios";
import {CancelTradeButton} from "./buttons/cancel_trade";
import {Button, Col, Container, Form, Row, FormGroup, Label, Input} from "reactstrap";
import CurrencyModalButton from "./currency/CurrencyModalButton";


class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrencyInput = this.handleCurrencyInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.handleBuyCurrencySelect = this.handleBuyCurrencySelect.bind(this);
    this.handleBuyCurrencyToggle = this.handleBuyCurrencyToggle.bind(this);
    this.handleSellCurrencyToggle = this.handleSellCurrencyToggle.bind(this);
    this.handleSellCurrencySelect = this.handleSellCurrencySelect.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);

    this.getRates = this.getRates.bind(this);

    this.state = {
        amount: '',
        rate: 0,
        buyCurrency: "",
        sellCurrency: "",
        currencies: [],
        buyDropDownOpen: false,
        buyDropDownValue: "",
        sellDropDownOpen: false,
        sellDropDownValue: "",
        result: "",
        disable_input: true,
        disable_save: true,

        modal: false
    };
  }

  handleCurrencyInput(amount) {
      const input = parseFloat(amount);
        if (Number.isNaN(input)) {
            return '';
        }
        this.setState(
            {
                amount: amount,
                disable_save: false,
            });
        this.getCurrencyResult();
  }
  handleModalToggle(event){
      this.setState({
          modal: !this.state.modal
      })
  };

  handleBuyCurrencyToggle (event){
      this.setState({buyDropDownOpen: !this.state.buyDropDownOpen});
  };


  handleSellCurrencyToggle (event){
      this.setState({sellDropDownOpen: !this.state.sellDropDownOpen});
  };


  handleBuyCurrencySelect (event)  {
      this.setState({
          buyDropDownValue: event.target.textContent,
          buyCurrency: event.target.textContent
      });
      this.getRates()
  }


    getCurrencyResult() {
    const result = this.state.amount * this.state.rate;
    this.setState({result: result});
    }

  handleSellCurrencySelect (event)  {
      this.setState({
          sellDropDownValue: event.target.textContent,
          sellCurrency: event.target.textContent
      });
  }

  getCurrencyArray () {
        // Encapsulates the GET
        getLatestRates().then(response => {
            const currencyAr = ["EUR"];
            for (const key in response.data.rates) {
                currencyAr.push(key);
            }
            this.setState({currencies: currencyAr});
        }).catch(err => {
            console.log("oppps", err);
        })
  };

   // Separated this from the calculation so you can type as many numbers as you like after populating
    getRates () {
        console.log("Getting rates");
        if (this.state.sellCurrency !== this.state.buyCurrency) {
            axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.sellCurrency}&symbols=${this.state.buyCurrency}`)
                .then(response => {
                    const rate = response.data.rates[this.state.buyCurrency];
                    this.setState({rate: rate});
                })
        }
    };
    handleSubmit() {

        const params = {
            buy: this.state.buyCurrency,
            sell: this.state.sellCurrency,
            rate: this.state.rate,
            amount: this.state.amount,
            result: this.state.result
        };
        addTrade(params).then(response => {
            console.log(response)
        });
        console.log('sent');
    }

    // Populate
    componentDidMount() {
        this.getCurrencyArray()
    }
    onSaveButtonClick(){
        const params = {
            buy: this.state.buyCurrency,
            sell: this.state.sellCurrency,
            rate: this.state.rate,
            amount: this.state.amount,
            result: this.state.result
        };
        addTrade(params).then(response => {
            console.log("Successfully stored trade")
        });
    }

    render() {
    const amount = this.state.amount;
    const rate = this.state.rate;
    const currencyList = this.state.currencies;
    const buyDropDownOpen = this.state.buyDropDownOpen;
    const buyDropDownValue = this.state.buyDropDownValue;
    const sellDropDownOpen = this.state.sellDropDownOpen;
    const sellDropDownValue = this.state.sellDropDownValue;
    return (
      <div>
          <Form>
                <Container>
                    <Row>
                        <Col>
                            <h2>New Trade<span role="img" aria-label="">&#x1f4b5;</span></h2>
                        </Col>
                        <Col></Col>
                        <Col>

                        </Col>
                        <Col>
                        </Col>
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
                            <CurrencySelect
                              id={"select_buy"}
                              dropDownOpen={sellDropDownOpen}
                              dropDownValue={sellDropDownValue}
                              currencyList={currencyList}
                              onCurrencyToggle={this.handleSellCurrencyToggle}
                              onCurrencyChange={this.handleSellCurrencySelect}>

                            </CurrencySelect>
                        </Col>
                        <Col>&#x276F;</Col>
                        <Col>{this.state.rate && <h3>{this.state.rate}</h3>}</Col>
                        <Col>&#x276F;</Col>
                        <Col>
                        <CurrencySelect
                          id={"select_buy"}
                          dropDownOpen={buyDropDownOpen}
                          dropDownValue={buyDropDownValue}
                          currencyList={currencyList}
                          onCurrencyToggle={this.handleBuyCurrencyToggle}
                          onCurrencyChange={this.handleBuyCurrencySelect}>
                        </CurrencySelect>
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
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Col>
                                <Label name={"rate"}>
                                    {this.state.result && <h3>{this.state.result}</h3>}
                                </Label>
                            </Col>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size: 'auto', offset: 1}}>
                            <Button
                                color={"primary"}
                                disabled={this.state.disable_save}
                                hidden={this.state.disable_save}
                                size="lg"
                                onClick={this.handleSubmit}>Create
                            </Button>
                        </Col>
                        <Col>
                            <CurrencyInput
                                value={amount}
                                onCurrencyInput={this.handleCurrencyInput}>
                            </CurrencyInput>
                        </Col>
                        <Col>
                            <CurrencyModalButton
                                isOpen={this.state.modal}
                                handleModalToggle={this.handleModalToggle}
                                onSaveButtonClick={this.onSaveButtonClick}></CurrencyModalButton>
                        </Col>
                        <Col>
                        <CurrencyResult
                                amount={amount}
                                rate={rate}>
                            </CurrencyResult>
                        </Col>
                        <Col>
                            <CancelTradeButton/>
                        </Col>
                    </Row>
                </Container>
            </Form>
      </div>
    );
  }
}

export default Converter