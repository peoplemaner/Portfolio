/*
    REST API Server
*/
const express = require('express');
const cors = require('cors');
const app = express();
const conf = require("./package.json");
const user = require('./routes/user');
const broadcast = require('./routes/broadcast');

app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cors());

app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    console.log(`url: ${req.headers.host}${req.path} / accessIP: ${ip} / query: ${JSON.stringify(req.query)} / body: ${JSON.stringify(req.body)}`);
    next();
});

process.on('uncaughtException', function (err) {
    console.log("unhandled exception : " + err + "\n" + err.stack);
});

const async = require('async');
//!< DB 풀 생성.
const mysql = require('mysql');
try { global.DB = mysql.createPool(conf.db); } catch (e) { console.log(e); }

app.get('/', function(req, res) {
    res.send("Restful API GET...!");
});

app.get('/check', function(req, res) {
    res.send("Restful API GET...!");
});

// 로그인
app.post('/login', (req, res) =>  { user.login(req, res); });

// 회원가입
app.post('/users', (req, res) => { user.createUser(req, res); });

// 방송방 조회
app.get('/broadcasts', (req, res) =>  { broadcast.getBroadCasts(req, res); });

// 방송방 생성
app.post('/broadcasts', (req, res) => { broadcast.createBroadcast(req, res); });

app.listen(conf.server.port, () => {
    console.log('START SERVER...! ' + conf.server.port);
});