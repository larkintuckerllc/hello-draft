import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form'
import './index.css';
import contact from './ducks/contact';
import App from './App';

const middlewares = [];
const store = createStore(
  combineReducers({
    contact,
    form: formReducer,
  }),
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
