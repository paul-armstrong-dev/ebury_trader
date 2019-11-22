import React from 'react';
import axios from "axios";
import { Table, Container , Button, Row, Col, Form} from 'reactstrap';
import {NewTradeButton} from "../components/buttons/new_trade"

  class StoredTradesTable extends React.Component {
      constructor(props) {
      super(props);

      this.state = {
        trades: []
      };
    }
    renderTableData () {
        if (this.state.trades && this.state.trades.length) {
          return this.state.trades.map((trade, index) => {
            const {trade_id, Sell_CCY, Sell_Amount, Buy_CCY, Buy_Amount, Rate, Date_Booked} = trade //destructuring
            return (
                <tr key={trade_id}>
                    <td>{Sell_CCY}</td>
                    <td>{Sell_Amount}</td>
                    <td>{Buy_CCY}</td>
                    <td>{Buy_Amount}</td>
                    <td>{Rate}</td>
                    <td>{Date_Booked}</td>
                </tr>
            )
          })
        }}

    renderTableHeader() {
        if (this.state.trades && this.state.trades.length)
        {
          let header = Object.keys(this.state.trades[0])
            // TODO: Move elsewhere
            // Remove invisible ID
            header = header.filter(e => e !== 'trade_id')
          return header.map((key, index) => {
            return <th key={index}>{key.replace("_", " ")}</th>
          })
        }
   }

    // Populate
    componentDidMount() {
      axios
        .get("http://localhost:5000/")
        .then(response => {
          console.log(response)
          this.setState({ trades: response.data });
        })
        .catch(err => {
          console.log("oppps", err);
        });
    }
    render() {
          return(
              <div>
              <Form>
              <Container>
                  <Row>
                      <Col>
                          <h1>Booked trades</h1>
                      </Col>
                      <Col>
                              <NewTradeButton>New trade</NewTradeButton>
                      </Col>
                  </Row>

            <Table bordered={true} striped={true}>
              <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
              </tbody>
            </Table>
                  </Container>
                  </Form>
              </div>
                  )
    }
  }
  export default StoredTradesTable