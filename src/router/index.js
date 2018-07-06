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

import * as actions from '@/store/info/action';

class Router extends Component{
    render(){
        let {logined} = this.props;
        if(logined === undefined){
            return <div/>;
        }
        return <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                {
                    logined ? <Route path="/" component={Main}/> : ''
                }
                <Redirect to="/login"/>
            </Switch>
        </HashRouter>
    }
    componentDidMount(){
        this.props.checkLogin();
    }
}


class Main extends Component{
    render(){
        return <div className="wrap">
            <Info/>
            <Content />
        </div>
    }
}

export default connect(state => state.infoData,actions)(Router);