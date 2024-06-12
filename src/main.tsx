/* eslint-disable filename-rules/match */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { WrappedApp } from './App';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  </React.StrictMode>
);
