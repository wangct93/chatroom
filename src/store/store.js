/**
 * Created by Administrator on 2018/7/3.
 */

import {createStore,combineReducers} from 'redux';
import wt from 'wt-butil';

import * as info from './info/reducer';
import * as router from './router/reducer';
import * as chatroom from './chatroom/reducer';

let func = combineReducers(wt.extend(info,router,chatroom));

let store = createStore((state = {},action) => {
    console.log('store操作：' + action.type);
    console.log(location.hash);
    return func(state,action);
});

window.store = store;
export default store;
export const dispatch = (...ary) => {
    store.dispatch(...ary);
};