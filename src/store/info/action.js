/**
 * Created by Administrator on 2018/7/3.
 */


export const checkLogin = () => {
    return {
        type:'checkLogin'
    }
};

export const login = data => {
    return {
        type:'userLogin',
        data
    }
};