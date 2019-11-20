import React from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

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
            const {purchase_id, rate} = trade //destructuring
            return (
                <tr key={purchase_id}>
                  <td>{purchase_id}</td>
                  <td>{rate}</td>
                </tr>
            )
          })
        }}

    renderTableHeader() {
        if (this.state.trades && this.state.trades.length)
        {
          let header = Object.keys(this.state.trades[0])
          return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
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
            <h1>React Dynamic Table</h1>
            <Table borderless={true}>
              <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
              </tbody>
            </Table>
         </div>)
    }
  }
  export default StoredTradesTable