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
    loadUserInfo(state,action){
        state.info = action.data;
    }
};




