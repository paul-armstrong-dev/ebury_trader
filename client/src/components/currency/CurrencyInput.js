import React from "react";
import {Input} from "reactstrap";

class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onCurrencyInput(e.target.value);
  }

  render() {
    const temperature = this.props.amount;
    return (
      <fieldset>
        <Input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default CurrencyInput;

