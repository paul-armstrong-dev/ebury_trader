import React from 'react'
import StartPage from "./pages/StartPage";
import NewTradePage from "./pages/NewTradePage";
import TradesPage from "./pages/TradesPage";
import {Route} from 'react-router-dom';

const Routes = () => (
    <div>
        <Route exact path="/" component={StartPage}/>
        <Route path="/Trades" component={TradesPage}/>
        <Route path="/NewTrade" component={NewTradePage}/>
    </div>
);


export default Routes

