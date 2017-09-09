import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-snapshot';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import {unregister} from './registerServiceWorker';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('root'));
unregister();
