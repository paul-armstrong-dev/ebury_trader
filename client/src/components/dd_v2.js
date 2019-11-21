import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import axios from "axios";


class BootstrapSelect extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
        this.state = {
            all_currencies: [],
            dropDownValue: 'Select action',
            dropdownOpen: false,
            rate: 0.0,
            currency: ""
        };
    }

    toggle(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    clickHandle(event) {
        let id = event.currentTarget.getAttribute("id");
        let name = event.currentTarget.getAttribute("name");
        let value = event.currentTarget.getAttribute("value");
        this.setState({dropDownValue: event.currentTarget.textContent, rate: id, currency: value })
        console.log("id-" + id);
        console.log("name-" + name);
        console.log("value-" + value);

    }

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

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    {Object.keys(this.state.all_currencies).map(key =><DropdownItem name={[key]}
                                                                                key={this.state.all_currencies[key]}
                                                                                value={this.state.all_currencies[key]}
                                                                                onClick={this.clickHandle}>{key}
                    </DropdownItem>)}
                </DropdownMenu>

            </ButtonDropdown>
        );
    }

}

export default BootstrapSelect;