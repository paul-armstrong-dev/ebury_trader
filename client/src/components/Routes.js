import React from 'react'
import StartPage from "./pages/StartPage";
import NewTradePage from "./pages/NewTradePage";
import TradesPage from "./pages/TradesPage";
import {Route, BrowserRouter as Router} from 'react-router-dom';

const Routes = () => (
    <div>
        <Router>
            <Route exact path="/" component={StartPage}/>
            <Route path="/Trades" component={TradesPage}/>
            <Route path="/NewTrade" component={NewTradePage}/>
        </Router>
    </div>
);


export default Routes

