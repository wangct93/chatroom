/**
 * Created by Administrator on 2018/7/3.
 */
/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';

let defaultState = {
    info:{
        imgSrc:'http://172.16.70.251:80/casematerial/A/330421/510000/201704/01/36xx/9617452070.jpg',
        name:'wangct'
    }
};

export const infoData = (state = defaultState, action = {}) => {
    let func = reducer[action.type];
    if (typeof func === 'function') {
        state = wt.clone(state);
        func(state, action);
    }
    return state;
};

const reducer = {};




