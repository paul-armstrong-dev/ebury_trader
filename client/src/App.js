import React from 'react';
import './App.css';
import "./assets/css/argon-dashboard-react.min.css"
import { Fragment } from 'react';
import Post from './components/post';
import Header from './components/header';
import SideCard from './components/sidecard';
import Routes from "./components/routing";

const App = () => (
    <div className="App">
        <Fragment>

      <Routes/>
        </Fragment>
    </div>

);



export default App;
