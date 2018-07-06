/**
 * Created by Administrator on 2018/7/3.
 */


import {dispatch} from '../store/store';

let ws,pro,info;

link();

function link(){
    ws = new WebSocket('ws://172.16.66.14:6650');
    ws.onmessage = receive;
    ws.onclose = function(){
        console.log('连接已关闭');
        setTimeout(() => {
            link();
        },1000);
    };
    pro = new Promise((cb,eb) => {
        ws.onopen = () => {
            if(info){
                send({
                    type:'login',
                    data:info
                });
            }
            cb();
        };
    });
}


function receive(e){
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
}

export const send = data => {
    pro.then(() => {
        let msg = JSON.stringify(data);
        console.log('发送信息：',msg);
        ws.send(msg);
    });
};



let actions = {
    loginSuccess(data){
        info = data;
        dispatch({
            type:'loadUserInfo',
            data
        });
        location.hash = '/';
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