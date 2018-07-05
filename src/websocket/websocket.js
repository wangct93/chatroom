/**
 * Created by Administrator on 2018/7/3.
 */


import {dispatch} from '../store/store';

let ws = new WebSocket('ws://172.16.66.14:6650');


ws.onopen = e => {
    send({
        type:'login',
        data:{
            name:'wangct_' + +new Date()
        }
    },true);
};


ws.onmessage = function(e){
    let message = e.data;
    console.log('接收到信息：',message);
    let msgData;
    try{
        msgData = JSON.parse(message);
    }catch(e){
        msgData = {};
        console.log(e);
    }
    let {data,type} = msgData;
    let func = actions[type];
    if(typeof func === 'function'){
        func(data);
    }
};

ws.onclose = function(){
    console.log('连接已关闭');
};


let loginedFunc;

let pro = new Promise((cb,eb) => {
    loginedFunc = cb;
});

export const send = (data,bol) => {
    let msg = JSON.stringify(data);
    if(bol){
        console.log('发送信息：',msg);
        ws.send(msg);
    }else{
        pro.then(() => {
            console.log('发送信息：',msg);
            ws.send(msg);
        });
    }
};



let actions = {
    loginSuccess(data){
        loginedFunc();
    },
    setList(data){
        dispatch({
            type:'setRoomList',
            data
        });
    },
    createRoom(data){
        dispatch({
            type:'addRoom',
            data
        });
    },
    roomInfo(data){
        dispatch({
            type:'setRoomInfo',
            data
        });
    },
    exit(data){
        dispatch({
            type:'userExitRoom',
            info:data.userInfo,
            roomId:data.id
        });
    },
    joinRoom(data){
        dispatch({
            type:'joinRoom',
            roomId:data.id,
            info:data.userInfo
        });
    },
    exitRoom(data){
        dispatch({
            type:'exitRoom',
            roomId:data.id,
            info:data.userInfo
        });
    },
    addText(data){
        dispatch({
            type:'addRoomText',
            data
        });
    }
};