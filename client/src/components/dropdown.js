import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import axios from "axios";

class BootstrapSelect extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.renderDropDownMenu = this.renderDropDownMenu.bind(this);
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

    changeValue(e) {
      console.log(e.target.name)
        this.setState({dropDownValue: e.currentTarget.textContent});
        let id = e.currentTarget.getAttribute("id");
        console.log(id);
    }

    renderDropDownMenu(){


      if (this.state.currencies && this.state.currencies.length) {
        return this.state.currencies.map((action, index) => {
            const {key, value} = action //destructuring
            return (
                <DropdownItem id={key} key={key} onClick={this.changeValue}>{value}</DropdownItem>
            )
          })
        }
    }


    componentDidMount() {
      axios
              .get(`https://api.exchangeratesapi.io/latest?`)
              .then(response => {
                this.setState({currencies: response.data.rates})
              })
              .catch(error => {
                console.log("Opps", error.message);
              });}

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                  {this.renderDropDownMenu()}
                </DropdownMenu>

            </ButtonDropdown>
        );
    }

}

export default BootstrapSelect;