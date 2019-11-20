import React from 'react';
import './App.css';
import Converter from "./components/converter";
import StoredTradesTable from "./components/stored_trades"

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
