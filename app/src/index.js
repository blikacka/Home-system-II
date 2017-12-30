import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

window.axios = axios
window.api = process.env.REACT_APP_API_HOST

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
