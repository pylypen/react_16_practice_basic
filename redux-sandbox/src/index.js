import {createStore} from 'redux';
import reducer from "./reducer";
import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from "react-redux"


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
