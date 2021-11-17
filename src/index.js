import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import Router from './router';

import {store} from './store';
import {appHistory} from './services/HistoryConfig';
import './assets/css/styles.css';
import './assets/css/custom.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={appHistory}>
      <Router />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
