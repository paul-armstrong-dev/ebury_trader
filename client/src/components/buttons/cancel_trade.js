import React from 'react'
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";

export function CancelTradeButton() {
    let history = useHistory();

    function handleClick() {
        history.push("/Trades");
    }

    return (
        <Button className="cancel-trade button" color={"primary"} size="lg" onClick={handleClick}>
            Cancel
        </Button>
    );
}