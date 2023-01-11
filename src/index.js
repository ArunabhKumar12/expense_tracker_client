import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {store} from './store/store' ;
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
  {/* Now we can access this central store from any component of my react application  */}
    <App />
  </Provider>
  // </React.StrictMode>
);


