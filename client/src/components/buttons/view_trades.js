import React from 'react'
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";

export function ViewTradesButton() {
    let history = useHistory();

    function handleClick() {
        history.push("/Trades");
    }

    return (
        <Button color={"primary"} size="lg" onClick={handleClick}>
            View stored trades
        </Button>
    );
}