import React from 'react'
import StartPage from "./pages/start_page";
import NewTradePage from "./pages/new_trade";
import TradesPage from "./pages/trades";
import { Route } from 'react-router-dom';

const Routes = () => (
    <div>
        <Route exact path="/" component={StartPage} />
        <Route path="/Trades" component={TradesPage} />
        <Route path="/NewTrade" component={NewTradePage} />
    </div>
)



export default Routes

