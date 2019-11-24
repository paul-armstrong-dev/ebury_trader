import React from 'react';
import StoredTradesTable from "../StoredTradesTable";
import {NewTradeButton} from "../buttons/new_trade"

class TradesPage extends React.Component {
    render() {
        return (
            <div>
                <NewTradeButton/>
                <StoredTradesTable/>
            </div>
        );
    }
}

export default TradesPage