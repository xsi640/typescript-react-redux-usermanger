import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import Main from './components/main'
import { Button, Table } from 'antd'
import reducers from './reducers'
import logger from 'redux-logger'
import './style.scss'

const middlewares = [];
middlewares.push(thunk)
middlewares.push(logger)

const store = createStore<any>(reducers, applyMiddleware(...middlewares));

class App extends Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>)
    }
}

ReactDOM.render(<App />, document.getElementById('root'))