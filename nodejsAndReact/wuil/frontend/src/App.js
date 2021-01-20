import React from 'react';
import Main from "./components/Main"

import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/config';

const store = ConfigStore();


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div heigth="100" className="App">
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
