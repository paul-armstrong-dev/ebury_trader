import React from 'react';
import logo from './logo.svg';
import './App.css';
import Converter from "./components/converter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Converter></Converter>
      </header>
    </div>
  );
}

export default App;
