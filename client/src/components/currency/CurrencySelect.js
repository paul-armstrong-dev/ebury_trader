import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";


class CurrencySelect extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleToggle(event) {
        this.props.onCurrencyToggle(event);
    }

    handleChange(event) {
        this.props.onCurrencyChange(event)
    }


    render() {
        const currencyList = this.props.currencyList;
        const dropDownOpen =  this.props.dropDownOpen;
        const dropDownValue = this.props.dropDownValue === '' ? 'Please select a currency' : this.props.dropDownValue;
        return (
            <div>
            <ButtonDropdown isOpen={dropDownOpen} toggle={this.handleToggle}>
                <DropdownToggle caret>
                    {dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    {currencyList.map(curr => {
                        return <DropdownItem id={curr} key={curr} onClick={this.handleChange}>{curr}</DropdownItem>
                    })}
                </DropdownMenu>
            </ButtonDropdown>
            </div>
                );
    }

}

export default CurrencySelect;