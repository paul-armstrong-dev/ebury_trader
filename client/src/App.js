import React, {Fragment} from 'react';
import './styles/argon-dashboard-react.min.css';
import Header from './components/header';
import Routes from "./components/Routes";

const App = () => (
    <div className="App">
        <Header>
        </Header>
        <Fragment>
            <main className="my-lg-2 py-lg-7">
                <Routes/>
            </main>
        </Fragment>
    </div>

);


export default App;
