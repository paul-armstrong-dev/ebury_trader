import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import StoredTradesTable from "./stored_trades";


class SelectCurrency extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            dropDownValue: 'Select action',
            actions: []
        }
    }

    toggle(event)
    {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    render() {return (<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                          <DropdownToggle caret color={"primary"} size={"lg"}>
                              {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu id="menu">
                              {Object.keys(this.state.actions).map(key =><DropdownItem
                                      id={"field"}
                                      name={key}
                                      key={this.state.actions[key]}
                                      value={this.state.actions[key]}>
                                      {key}
                              </DropdownItem>)}
                          </DropdownMenu>
                      </ButtonDropdown>)
    }

}
  export default SelectCurrency