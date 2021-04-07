const axios = require('axios');
const querystring = require('querystring');
const async = require('async');
const schedule = require('node-schedule');
const config = require('./config').config;
const loggerDevelopment = require('./config/winstonDevelopment').logger;
const loggerLive = require('./config/winstonLive').logger;

let logger = {};
let targetObject = {};

const instance = axios.create();
instance.defaults.timeout = config.process.requestTimeOut;

if (process.argv[2] == 'dev') {
    targetObject = config.dev;
    logger = loggerDevelopment;
} else {
    targetObject = config.live;
    logger = loggerLive;
}

setInterval(() => {
    logger.info("[MONITERING] Start...!");
    async.eachSeries(targetObject.serverList, (serverObject, callback) => {
        checkServer(serverObject, (error, result) => { callback(null, null); });
    }, (error, result) => {
        logger.info('[MONITERING] Complete...!');
    });
}, config.process.checkInterval);

function checkServer(serverObject, callback) {
    const start = new Date();
    instance.get(serverObject.url)
    .then((response) => {
        const timeDiff = new Date() - start;
        let isSuccess = false;
        let failMessage = '';
        try {
            switch(serverObject.type) {
                case 'API_AND_DATABASE': 
                    if (response.data.result == 'success') isSuccess = true;
                    else failMessage = response.data.result;
                    break;
                case 'SOCKET':
                case 'HEALTH_CHECK': 
                    if (removeEnter(response.data) == 'OK') isSuccess = true;
                    break;
            }
        } catch (error) {
            logger.error(`checkServer response parse Error : ${error}`);
            return;
        }

        if (isSuccess) {
            logger.info(`[${serverObject.type}] : ${serverObject.url} : isSuccess = ${isSuccess} : ${timeDiff}ms : failCount = ${serverObject.failCount}`);

            if(serverObject.min == 0) serverObject.min = timeDiff;
            if(serverObject.max == 0) serverObject.max = timeDiff;

            if(timeDiff < serverObject.min) serverObject.min = timeDiff;
            if(timeDiff > serverObject.max) serverObject.max = timeDiff;

            // 정상화 알림
            if(serverObject.failCount > 0) {
                logger.error(`[${serverObject.type}_NORMALIZED] URL - ${serverObject.url} : failCount = ${serverObject.failCount}`);
                if(serverObject.failCount >= targetObject.notificationBaseValue)
                    sendWarning(`[${serverObject.type}_NORMALIZED] URL - ${serverObject.url} : failCount = ${serverObject.failCount}`);
            }

            serverObject.failCount = 0;
        } else {
            serverObject.failCount += 1;
            logger.error(`[${serverObject.type}] : ${serverObject.url} : failMessage = ${failMessage} : ${timeDiff}ms : failCount = ${serverObject.failCount}`);

            if (serverObject.failCount == targetObject.notificationBaseValue)
                sendWarning(`[${serverObject.type}] URL - ${serverObject.url} Other : failCount = ${serverObject.failCount}`);
        }
        callback(null, null);
    }).catch((error) => {
        serverObject.failCount += 1;
        logger.error(`[${serverObject.type}] : ${serverObject.url} : Axios Error : ${error} : failCount = ${serverObject.failCount}`);

        if (serverObject.failCount == targetObject.notificationBaseValue)
            sendWarning(`[${serverObject.type}] URL - ${serverObject.url} ${error} : failCount = ${serverObject.failCount}`);

        callback(null, null);
    });
}

function sendWarning(message) {
    logger.error(`[SEND_WARNING]${message}`);
    sendNateOn(`${message} (${new Date()})`);
}

function sendNateOn(message) {
    axios.post(targetObject.nateOnWebHook
        , querystring.stringify({ content: message })
        , { headers: { "Content-Type": `application/x-www-form-urlencoded`}})
    .then((response) => { }).catch((error) => { logger.error(`sendNateOn catch : ${error}`); });
}

function removeEnter(string) {
    let value = string.replace(/(\n| )/g,"");
    value = value.replace(/\r/g, "");
    return value;
}

schedule.scheduleJob('58 59 23 * * *', () => {
    targetObject.serverList.forEach(server => {
        logger.error(`[API_MIN_MAX] min: ${server.min}ms, max: ${server.max}ms [${server.url}]`);
        server.min = 0;
        server.max = 0;
    });
});