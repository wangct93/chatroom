/**
 * Created by Administrator on 2018/7/3.
 */
import './less/index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import store from './store/store';
import './websocket/websocket';


import RouterComponent from './router';

class Container extends Component{
    render(){
        return <Provider store={store}>
            <RouterComponent/>
        </Provider>
    }
}

render(<Container />,$('#container')[0]);