/**
 * Created by Administrator on 2018/7/3.
 */
/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';

let defaultState = {
    // info:{
    //     name:'wangct'
    // }
};

export const infoData = (state = defaultState, action = {}) => {
    let func = reducer[action.type];
    if (typeof func === 'function') {
        state = wt.clone(state);
        func(state, action);
    }
    return state;
};

const reducer = {
    userLogin(state,action){
        $.ajax({
            url:'http://localhost:8000/login',
            type:'post',
            data:action.data,
            success(data){
                console.log(data);
            },
            error(err){
            }
        });
    },
    loadUserInfo(state,action){
        state.info = action.data;
    },
    checkLogin(state,action){
        $.ajax({
            url:'http://localhost:8000/login/check',
            type:'post',
            success(data){
                dispatch({
                    type:'loginState',
                    data
                });
            },
            error(err){
                dispatch({
                    type:'loginState',
                    data:0
                });
            }
        });
    },
    loginState(state,action){
        console.log(action.data);
        state.logined = action.data;
    }
};




