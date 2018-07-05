/**
 * Created by Administrator on 2018/7/3.
 */
/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';


let defaultState = {
    list:[
        // {
        //     imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg',
        //     name:'聊天室1'
        // },
        // {
        //     imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg',
        //     name:'聊天室2'
        // },
        // {
        //     imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg',
        //     name:'聊天室3'
        // },
        // {
        //     imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg',
        //     name:'聊天室4'
        // },
        // {
        //     imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36cc/-690550393.jpg',
        //     name:'聊天室5'
        // }
    ]
};

export const chatroomData = (state = defaultState, action = {}) => {
    let func = reducer[action.type];
    if (typeof func === 'function') {
        state = wt.clone(state);
        func(state, action);
    }
    return state;
};

const reducer = {
    setRoomList(state,action){
        state.list = action.data;
    },
    addRoom(state,action){
        let list = wt.getValue(state,'list',[]);
        list.push(action.data);
    },
    setRoomInfo(state,action){
        state.curInfo = action.data;
    },
    joinRoom(state,action){
        state.curInfo.userList.push(action.info);
    },
    exitRoom(state,action){
        let {userList} = state.curInfo;
        let index = userList.indexOfFunc(item => item.name === action.info.name);
        if(index !== -1){
            userList.splice(index,1);
        }
    },
    userExitRoom(state,action){
        let {userList} = state.curInfo;
        let index = userList.indexOfFunc(item => item.name === action.info.name);
        if(index !== -1){
            userList.splice(index,1);
        }
    },
    addRoomText(state,action){
        let {data:textData} = action;
        state.curInfo.textList.push(textData);
    }
};




