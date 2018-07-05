/**
 * Created by Administrator on 2018/7/3.
 */

let ws = require('nodejs-websocket');
let wt = require('wt-sutil');
let list = [
    {
        id:1,
        name:'wangct',
        textList:[
            {
                user:'wangct',
                text:'这里是测试问题',
                time:'2018-01-01 12:22:43'
            }
        ]
    },
    {
        id:2,
        name:'wangct2'
    },
    {
        id:3,
        name:'wangct3'
    }
];

let port = 6650;

let server = ws.createServer(function(conn){
    conn.on('text',function(message){
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
            func(conn,data);
        }
    });
    conn.on("close", (code, reason) => {
        let {name} = conn.userInfo || {};
        console.log(`${name} 连接断开，原因：${reason}`);
        destroy(conn);
    });
    conn.on("error",(code, reason) => {
        let {name} = conn.userInfo || {};
        console.log(`${name} 连接出错断开，错误原因：${reason}`);
        // destroy(conn);
    });
}).listen(port,() => {
    console.log('服务器建立成功，端口号'+ port +'！');
});


const actions = {
    login(conn,data){
        conn.userInfo = data;
        send(conn,{
            type:'loginSuccess'
        });
    },
    getRoomList(conn,data){
        send(conn,{
            type:'setList',
            data:list.map(item => wt.clone(item,['id','imgSrc','name']))
        });
    },
    send(conn,data){
        let {id,text} = data;
        let chatroom = list[list.indexOfFunc(item => item.id === +id)];
        if(chatroom){
            let textList = wt.getValue(chatroom,'textList',[]);
            let {userInfo} = conn;
            let textObj = {
                roomId:id,
                id:textList.length ? textList[textList.length - 1].id + 1 : 1,
                text,
                time:new Date().toFormatString(),
                user:userInfo.name
            };
            textList.push(textObj);
            wt.getValue(chatroom,'userList',[]).forEach(item => {
                send(item,{
                    type:'addText',
                    data:textObj
                });
            });
        }
    },
    joinRoom(conn,data){
        let {id} = data;
        let chatroom = list[list.indexOfFunc(item => item.id === +id)];
        if(chatroom){
            let userList = wt.getValue(chatroom,'userList',[]);
            userList.forEach(item => {
                send(item,{
                    type:'joinRoom',
                    data:{
                        id,
                        userInfo:conn.userInfo
                    }
                });
            });
            userList.push(conn);
            wt.getValue(conn,'roomList',[]).push(chatroom);
            send(conn,{
                type:'roomInfo',
                data:wt.extend(wt.clone(chatroom,['id','name','textList']),{
                    userList:chatroom.userList.map(item => item.userInfo)
                })
            });
        }
    },
    exitRoom(conn,data){
        let {id} = data;
        let chatroom = list[list.indexOfFunc(item => item.id === +id)];
        if(chatroom){
            let userList = wt.getValue(chatroom,'userList',[]);
            let index = userList.indexOf(conn);
            if(index !== -1){
                userList.splice(index,1);
                userList.forEach(item => {
                    send(item,{
                        type:'exitRoom',
                        data:{
                            id,
                            userInfo:conn.userInfo
                        }
                    });
                });
            }
        }
    },
    createRoom(conn,data){
        let id = list.length ? list[list.length - 1].id + 1 : 1;
        let {name} = data;
        let roomData = {
            id,
            name,
            textList:[],
            userList:[conn],
            creator:conn
        };
        list.push(roomData);
        wt.getValue(conn,'roomList',[]).push(roomData);
        send(conn,{
            type:'createRoom',
            data:wt.clone(roomData,['id','name'])
        });
    }
};


function send(conn,data){
    let msg = JSON.stringify(data);
    console.log('发送信息：',msg);
    conn.send(msg);
}


function destroy(conn){
    wt.getValue(conn,'roomList',[]).forEach(room => {
        room.userList.remove(conn);
        room.userList.forEach(item => {
            send(item,{
                type:'exit',
                data:{
                    id:room.id,
                    userInfo:conn.userInfo
                }
            });
        });
    });
}