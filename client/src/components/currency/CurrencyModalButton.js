import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ViewTradesButton} from "../buttons/view_trades"
import {NewTradeButton} from "../buttons/new_trade";

class CurrencyModalButton extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);

    }

    toggle(event) {
        this.props.handleModalToggle();
    }


    handleCreateButtonClick(event){
        this.props.handleModalToggle();
        this.props.onSaveButtonClick(event)
    }


    render(){
        return (
            <div className="div-inline">
                <Button color={"primary"}
                        onClick={this.handleCreateButtonClick}
                        disabled={this.props.disabled}
                        hidden={this.props.hidden}
                >
                    Create New Trade
                </Button>
                <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.buttonType} Success </ModalHeader>
                    <ModalBody>
                        You have successfully stored a new trade, would you like to view the stored trades or create another?
                    </ModalBody>
                    <ModalFooter>
                         <Button color={"primary"} size="lg" onClick={this.toggle}>
                             New Trade
                         </Button>
                        <ViewTradesButton onClick={this.toggle}></ViewTradesButton>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CurrencyModalButton;