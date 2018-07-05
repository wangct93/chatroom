/**
 * Created by Administrator on 2018/7/3.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Img} from 'wt-reacts';
import {Icon,Button,Modal,Form,Input,message} from 'antd';
import {send} from '@/websocket/websocket';



class RoomView extends Component{
    render(){
        let {info = {}} = this.props;
        let {name,userList,textList} = info;
        return <div className="room-container">
            <div className="header">
                <Link to="/list">
                    <Icon type="left" />
                </Link>
                {name}
            </div>
            <div className="body">
                <div className="left">
                    <TextList data={textList} />
                    <div className="room-txt-box">
                        <textarea ref="input" className="room-textarea"/>
                        <div className="btn-box">
                            <a className="w-btn" onClick={this.sendInfo.bind(this)}>发送</a>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="header">用户列表</div>
                    <UserList data={userList} />
                </div>
            </div>
        </div>
    }
    componentDidMount(){
        let {id} = this.props.match.params;
        send({
            type:'joinRoom',
            data:{
                id
            }
        });
    }
    componentWillUnmount(){
        let {id} = this.props.match.params;
        send({
            type:'exitRoom',
            data:{
                id
            }
        });
    }
    sendInfo(){
        let {id} = this.props.match.params;
        let {input} = this.refs;
        let v = input.value;
        if(!v){
            message.info('请输入信息内容再发送！');
        }else{
            send({
                type:'send',
                data:{
                    id,
                    text:v
                }
            });
            input.value = '';
        }
    }
}

class TextList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="room-text-list">
            {
                data.map((item,i) => {
                    let {user,time,text} = item;
                    return <li key={i}>
                        <p className="text-title">{user} {time}</p>
                        <p className="text-content">{text}</p>
                    </li>
                })
            }
        </ul>
    }
}


class UserList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="room-user-list">
            {
                data.map((item,i) => {
                    let {name} = item;
                    return <li key={i}>{name}</li>
                })
            }
        </ul>
    }
}


export default connect(state => {
    return {
        info:state.chatroomData.curInfo
    }
})(RoomView);