import React from 'react'
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";

export function NewTradeButton() {
    let history = useHistory();

    function handleClick() {
        history.push("/NewTrade");
    }

    return (
        <Button color={"primary"} size="lg" onClick={handleClick}>
            New Trade
        </Button>
    );
}