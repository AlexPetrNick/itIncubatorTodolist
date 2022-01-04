import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {state, tasks} from "./state/state";

ReactDOM.render(<App
    state={state}
    tasks={tasks}
/>,  document.getElementById('root'));

