/*
    REST API Server
*/
const express = require('express');
const app = express();
const conf = require("./package.json");
const user = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded( {extended: false}));

process.on('uncaughtException', function (err) {
    console.log("unhandled exception : " + err + "\n" + err.stack);
});

const async = require('async');
//!< DB 풀 생성.
const mysql = require('mysql');
try { global.DB = mysql.createPool(conf.db); } catch (e) { console.log(e); }

app.get('/', function(req, res) {
    console.log(req.query);
    res.send("Restful API GET...!");
});

app.get('/check', function(req, res) {
    console.log(req.query);
    res.send("Restful API GET...!");
});

// 회원조회
app.get('/users', (req, res) =>  { user.login(req, res); });

// 회원가입
app.post('/users', (req, res) => { user.createUser(req, res); });

app.listen(conf.server.port, () => {
    console.log('START SERVER...! ' + conf.server.port);
});