/**
 * Created by Administrator on 2018/7/3.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Img} from 'wt-reacts';
import {Icon,Button,Modal,Form,Input} from 'antd';
import {send} from '@/websocket/websocket';

import * as actions from '@/store/info/action';

const FormItem = Form.Item;

class Box extends Component{
    render(){
        let {info} = this.props;
        if(!info){
            return <div/>;
        }
        let {imgSrc,name} = info;
        let {showAddDialog} = this.state || {};
        return <div className="info-wrap">
            <div className="header">
                <Img src={imgSrc} />
                <div className="text-name">{name}</div>
                <Button onClick={this.openAddDialog.bind(this)} icon="plus"/>
            </div>
            <div className="body">
            </div>
            <Modal width={400} visible={showAddDialog} title="添加聊天室" onOk={this.createRoom.bind(this)} onCancel={this.closeAddDialog.bind(this)}>
                <AddForm ref="form" />
            </Modal>
        </div>
    }
    openAddDialog(){
        this.setState({
            showAddDialog:true
        });
    }
    closeAddDialog(){
        this.setState({
            showAddDialog:false
        });
    }
    createRoom(){
        let form = this.refs.form.getForm();
        form.validateFields((err,formData) => {
            if(!err){
                send({
                    type:'createRoom',
                    data:formData
                });
                this.closeAddDialog();
            }
        })
    }
}


class AddFormView extends Component{
    render(){
        let {form} = this.props;
        let {getFieldDecorator} = form;
        return <Form>
            <FormItem label="聊天室名称">
                {
                    getFieldDecorator('name',{
                        rules:[{
                            required:true
                        }]
                    })(<Input/>)
                }
            </FormItem>
        </Form>
    }
}

let AddForm = Form.create()(AddFormView);



export default connect(state => state.infoData,actions)(Box);