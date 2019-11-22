import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class BootstrapSelect extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);

    }

    toggle(event) {
        this.props.toggle(event);
    }

    changeValue(event) {
        this.props.changeValue(event);
    }


    render() {
        const dropDownOpen = this.props.dropDownOpen;
        const dropDownValue = this.props.dropDownValue;
        const allCurrencies = this.props.allCurrencies;
        return (

            <ButtonDropdown isOpen={dropDownOpen} toggle={this.toggle}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu>
                              {Object.keys(allCurrencies).map(key =><DropdownItem
                                      name={key}
                                      key={allCurrencies[key]}
                                      value={allCurrencies[key]}
                                      onClick={event=> this.changeValue(event)}>
                                      {key}
                              </DropdownItem>)}
                          </DropdownMenu>
                      </ButtonDropdown>
        );
    }

}

export default BootstrapSelect;