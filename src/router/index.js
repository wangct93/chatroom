/**
 * Created by Administrator on 2018/7/3.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import Login from '../view/login';
import Info from '../view/info';
import Content from '../view/content';
import {SwitchRouter} from 'wt-reacts';

export default class Router extends Component{
    render(){
        return <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={MainView} />
            </Switch>
        </HashRouter>
    }
}


class Main extends Component{
    render(){
        let {info} = this.props;
        if(!info){
            return <Redirect to="/login" />
        }
        return <div className="wrap">
            <Info/>
            <Content />
        </div>
    }
}



const MainView = connect(state => state.infoData)(Main);