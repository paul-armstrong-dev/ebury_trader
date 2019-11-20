import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import axios from "axios";


class BootstrapSelect extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            currencies: [],
            dropDownValue: 'Select action',
            dropdownOpen: false
        };
    }

    toggle(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue(event) {
        this.setState({dropDownValue: event.currentTarget.textContent});
        let id = event.currentTarget.getAttribute("id");

        let name = event.currentTarget.getAttribute("name");
        let value = event.currentTarget.getAttribute("value");
        console.log("id-" + id);
        console.log("name-" + name);
        console.log("value-" + value);

    }

    componentDidMount() {
      axios
        .get("https://api.exchangeratesapi.io/latest")
        .then(response => {
          this.setState({currencies: response.data.rates})
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
                    {Object.keys(this.state.currencies).map(key =><DropdownItem name={[key]}
                                                                                key={this.state.currencies[key]}
                                                                                value={this.state.currencies[key]}
                                                                                onClick={this.changeValue}>{key}
                    </DropdownItem>)}
                </DropdownMenu>

            </ButtonDropdown>
        );
    }

}

export default BootstrapSelect;