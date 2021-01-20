import React from 'react';
import Main from "./components/Main"

import { BrowserRouter} from 'react-router-dom'





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
