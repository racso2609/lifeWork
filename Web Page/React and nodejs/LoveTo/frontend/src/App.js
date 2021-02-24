import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Main from "./components/main"

function App() {
  return (

    <BrowserRouter>
      <div heigth="100" className="App">
        <Main/>
      </div>
    </BrowserRouter>
  );
}

export default App;
