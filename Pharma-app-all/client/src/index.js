import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
  <Router>
  <App />
  </Router>
</React.StrictMode>,
  document.getElementById('root')
);

