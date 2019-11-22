import React from 'react';
import './App.css';
import "./assets/css/argon-dashboard-react.min.css"
import { Fragment } from 'react';
import Header from './components/header';
import Routes from "./components/routing";

const App = () => (
    <div className="App">
        <Fragment>

        <main className="my-lg-9 py-lg-9">
      <Header/>
      <Routes/>
    </main>
        </Fragment>
    </div>

);



export default App;
