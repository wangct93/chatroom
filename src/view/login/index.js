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

let FormItem = Form.Item;


export default class LoginBox extends Component{
    render(){
        return <div className="login-container">
            <FormView />
        </div>
    }
}

class FormBase extends Component{
    render(){
        let {getFieldDecorator} = this.props.form;
        return <Form onSubmit={this.submit.bind(this)}>
            <FormItem label="用户名">
                {
                    getFieldDecorator('name',{
                        rules:[
                            {
                                required:true
                            }
                        ]
                    })(<Input />)
                }
            </FormItem>
            <Button htmlType="submit">登录</Button>
        </Form>
    }
    submit(e){
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                send({
                    type:'login',
                    data:values
                },true)
            }
        });
    }
}

let FormView = Form.create()(FormBase);