import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ViewTradesButton} from "../buttons/view_trades"

class CurrencyModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleClick(event){
        this.props.onSaveButtonClick(event)
    }

    render(){
        return (
            <div className="div-inline">
                <ViewTradesButton color={"secondary"} onClick={this.toggle}></ViewTradesButton>
                <Button color={"secondary"} onClick={this.toggle}>{this.props.buttonType} button</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.buttonType} Modal Title</ModalHeader>
                    <ModalBody>
                        This is a modal window thrown by the {this.props.buttonType} button.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Go it!</Button>
                    <ViewTradesButton color="primary" onClick={this.toggle}></ViewTradesButton>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CurrencyModalButton;