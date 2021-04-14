import React from "react";

import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";

import RouterSwitch from "./route"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route component={RouterSwitch} />
      </BrowserRouter>
    </div>
  );
}

export default App;
