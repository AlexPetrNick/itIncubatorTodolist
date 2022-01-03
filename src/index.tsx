import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addList, state} from "./state/state";

ReactDOM.render(<App
    state={state}
/>,  document.getElementById('root'));

