/**
 * Created by Administrator on 2018/7/3.
 */
/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';

import List from '../../view/list';
import Room from '../../view/room';

let defaultState = {
    list:[
        {
            path:'/list',
            component:List
        },
        {
            path:'/room/:id',
            component:Room
        }
    ]
};

export const routerData = (state = defaultState, action = {}) => {
    let func = reducer[action.type];
    if (typeof func === 'function') {
        state = wt.clone(state);
        func(state, action);
    }
    return state;
};

const reducer = {};




