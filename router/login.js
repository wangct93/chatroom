/**
 * Created by Administrator on 2018/7/2.
 */



const express = require('express');
const router = express.Router();
const wt = require('wt-sutil');
const {mysql} = wt;

module.exports = router;

router.post('/',(req,res,next) => {
    let {name,pwd} = req.body;
    let {session} = req;
    session.userInfo = {
        name
    };
    session.save();
    res.send('1');
    // mysql.query(`select * from user where name='${name}'`,data => {
    //     let info = data[0];
    //     if(info && info.password === pwd){
    //         let {session} = req;
    //         session.userInfo = info;
    //         session.save();
    //         res.send('1');
    //     }else{
    //         res.send('0');
    //     }
    // },err => {
    //     res.status(500).send('server has error!');
    // });
});

router.post('/check',(req,res,next) => {
    let {userInfo} = req.session;
    res.send(userInfo ? '1' : '0');
    // mysql.query(`select * from user where name='${name}'`,data => {
    //     let info = data[0];
    //     if(info && info.password === pwd){
    //         let {session} = req;
    //         session.userInfo = info;
    //         session.save();
    //         res.send('1');
    //     }else{
    //         res.send('0');
    //     }
    // },err => {
    //     res.status(500).send('server has error!');
    // });
});