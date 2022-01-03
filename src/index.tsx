import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addList, addTaskWithID, state, tasks} from "./state/state";

ReactDOM.render(<App
    state={state}
    tasks={tasks}
    addTaskWithID={addTaskWithID}
/>,  document.getElementById('root'));

