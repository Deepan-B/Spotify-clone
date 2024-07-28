import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from "./serviceWorker"
import { DataLayer } from "./DataLayer.jsx"
import { initialState , reducer} from './Reducer.jsx';

ReactDOM.render(
  <React.StrictMode>
  <DataLayer initialState ={initialState} reducer = {reducer}>
  <App />
  </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
