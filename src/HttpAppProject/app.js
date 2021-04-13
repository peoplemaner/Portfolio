/*
    REST API Server for KSVR
*/
const express = require('express');
const app = express();
const conf = require("./package.json");

app.use(express.json());

process.on('uncaughtException', function (err) {
    console.log("unhandled exception : " + err + "\n" + err.stack);
});

const async = require('async');
//!< DB 풀 생성.
const mysql = require('mysql');
try{
	global.DB = mysql.createPool(conf.db);
}catch(e){
	console.log(e);
}

app.get('/', function(req, res) {
    console.log(req.query);
    res.send("Restful API GET...!");
});

app.get('/check', function(req, res) {
    console.log(req.query);
    res.send("Restful API GET...!");
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send("Restful API POST...!");
});

app.listen(conf.server.port, function () {
    console.log('START SERVER...! ' + conf.server.port);
    /*DB.query("SELECT * FROM ACCOUNT", function(error, result){
        if(error){
            console.log(error);
        } else {
            console.log(result[0]);
        }

    });*/
});ß