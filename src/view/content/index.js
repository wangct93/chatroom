/**
 * Created by Administrator on 2018/7/3.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Img,SwitchRouter} from 'wt-reacts';

class Wrap extends Component{
    render(){
        let {list = []} = this.props;
        return <HashRouter>
            <div className="router-wrap">
                <SwitchRouter data={list} />
            </div>
        </HashRouter>
    }
}



export default connect(state => state.routerData)(Wrap);