/**
 * Created by Administrator on 2018/7/3.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Img} from 'wt-reacts';

import {send} from '@/websocket/websocket';

Img.setErrorSrc('http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg');

class ListBox extends Component{
    render(){
        let {list} = this.props;
        return <div className="chatroom-list-wrap">
            <div className="header">聊天室列表</div>
            <div className="body">
                <List data={list} />
            </div>
        </div>
    }
    componentDidMount(){
        send({
            type:'getRoomList'
        });
    }
}

class List extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="chatroom-list">
            {
                data.map((item,i) => {
                    let {id,imgSrc,name} = item;
                    return <li onClick={() => {
                        location.hash = '/room/' + id;
                    }} key={i}>
                        <Img src={imgSrc} />
                        <div className="text-name">{name}</div>
                    </li>
                })
            }
        </ul>
    }
}


export default connect(state => ({
    list:state.chatroomData.list
}))(ListBox);