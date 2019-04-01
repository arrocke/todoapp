import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from './client';
import * as serviceWorker from './serviceWorker';
import './styles.css'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
