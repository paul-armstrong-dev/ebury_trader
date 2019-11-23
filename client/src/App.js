import React, {Fragment} from 'react';
import './styles/App.css';
import Header from './components/header';
import Routes from "./components/Routes";

const App = () => (
    <div className="App">
        <Fragment>

            <main className="my-lg-9 py-lg-9">
                <Routes/>
            </main>
        </Fragment>
    </div>

);


export default App;
