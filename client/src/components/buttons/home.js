import React from 'react'
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";

export function HomeButton() {
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }

    return (
        <Button color={"primary"} size="lg" onClick={handleClick}>
            Go home
        </Button>
    );
}