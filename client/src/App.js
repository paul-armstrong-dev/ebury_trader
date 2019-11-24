import React, {Fragment} from 'react';
import Routes from "./components/Routes";
import './styles/argon-dashboard-react.min.css';
import './styles/App.css'
import Header from './components/Header'
const App = () => (
    <div className="App">
        <Header/>
        <Fragment>
            <main className="my-lg-2 py-lg-7">
                <Routes/>
            </main>
        </Fragment>
    </div>

);


export default App;
