import React from 'react';
import {NewTradeButton} from "../components/buttons/new_trade";
import NewTrade from "../components/new_trade";

class StartPage extends React.Component {
  render() {
    return (
        <div>
            <NewTradeButton/>
        </div>);
  }
}

export default StartPage