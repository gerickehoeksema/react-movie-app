import React from 'react';
import ReactDOM from 'react-dom';

// Component
import App from './components/App/App';

// Style
import './index.css';

// redux
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

// reducers
import reducers from './reducers'

const storeWithMiddleware = applyMiddleware(promiseMiddleware)(createStore); // High order function

ReactDOM.render(
    <Provider store={storeWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root')
);