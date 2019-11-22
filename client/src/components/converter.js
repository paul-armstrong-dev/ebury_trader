import React from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "reactstrap";
import Label from "reactstrap/es/Label";
import {addContact} from "./requests"

class Converter extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            result: null,
            buyCurrency: "",
            sellCurrency: "",
            amount: 0,
            rate: 0.0,
            currencies: [],
            disable_input: true
        }
    }

    handleSubmit(data) {
        console.log('form submission data', data);
        addContact(data)
        console.log('sent')
    }

    getCurrencyArray = () => {
        // Encapsulates the GET
        axios
            .get("https://api.exchangeratesapi.io/latest")
            .then(response => {
                const currencyAr = ["Select currency"];
                for (const key in response.data.rates) {
                    currencyAr.push(key);
                }
                currencyAr.push("EUR");
                this.setState({currencies: currencyAr});
            })
            .catch(err => {
                console.log("oppps", err);
            })
    };

    convertCurrency = () => {
        if (this.state.sellCurrency !== this.state.buyCurrency
            && this.state.amount !== 0) {
            if (this.state.sellCurrency !== this.state.buyCurrency) {
                axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.sellCurrency}&symbols=${this.state.buyCurrency}`)
                    .then(response => {
                        const rate = response.data.rates[this.state.buyCurrency];
                        const result = this.state.amount * rate;
                        this.setState({result: result.toFixed(5), rate: rate});
                    })
                    .catch(error => {
                        console.log("Opps", error.message);
                    });
            }
        }
    };


    // Populate
    componentDidMount() {
        this.getCurrencyArray()
    };

    // Sepated this from the calculation so you can type as many numbers as you like after populating
    getRates = () => {
        if (this.state.sellCurrency !== this.state.buyCurrency) {
            axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.sellCurrency}&symbols=${this.state.buyCurrency}`)
                .then(response => {
                    const rate = response.data.rates[this.state.buyCurrency];
                    this.setState({rate: rate});
                })
        }
    };

    calculateResult = () => {
        if (this.state.amount !== 0) {
            const result = this.state.amount * this.state.rate;
            this.setState({result: result.toFixed(5)});
        }
    }

    // Handle change
    convertHandler = (event) => {
        if (event.target) {
            // most active output first
            if (event.target.name === "in_amount") {
                this.setState({amount: event.target.value})
                this.calculateResult()
            } else if (event.target.name === "sell") {

                console.log(this.state.buyCurrency)
                this.setState({sellCurrency: event.target.value})

                if (this.state.buyCurrency !== "") {
                    this.getRates()

                    if (this.state.amount !== 0) {
                        this.calculateResult()
                    }

                }

            } else if (event.target.name === "buy") {
                console.log(this.state.sellCurrency)
                this.setState(
                    {
                        buyCurrency: event.target.value,
                        disable_input: false
                    }
                )
                this.getRates()
            }
        }
    };

    render() {
        const amount = this.state.amount;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Row>
                        <Col>
                            <h2>New Trade<span role="img" aria-label="">&#x1f4b5;</span></h2>
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
                            <select
                                name="sell"
                                onChange={event => this.convertHandler(event)}
                                value={this.state.sellCurrency}
                                placeholder={"Select currency"}>
                                >
                                {this.state.currencies.map(cur => (
                                    <option key={cur}>{cur}</option>
                                ))}
                            </select>
                        </Col>

                        <Col>&#x276F;</Col>
                        <Col>{this.state.rate && <h3>{this.state.rate}</h3>}</Col>
                        <Col>&#x276F;</Col>

                        <Col><select
                            name="buy"
                            onChange={event => this.convertHandler(event)}
                            value={this.state.buyCurrency}
                            placeholder={"Select currency"}>
                            {this.state.currencies.map(cur => (
                                <option key={cur}>{cur}</option>
                            ))}
                        </select>
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
                        <Col sm={{size: 'auto', offset: 1}}>
                            <input
                                id={"in_amount"}
                                name="in_amount"
                                type="number"
                                value={this.state.amount}
                                onChange={event => this.convertHandler(event)}
                                disabled={(this.state.disable_input) ? "disabled" : ""}
                            />
                        </Col>
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
                            <Button color={"primary"} size="lg" onClick={this.handleSubmit}>Create</Button>
                        </Col>
                        <Col>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Button color={"primary"} size="lg">Cancel</Button>
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