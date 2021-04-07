const config = {
    process: {
        requestTimeOut: 5000
        , checkInterval: 15000
    }
    , dev : {
        nateOnWebHook: 'https://teamroom.nate.com/api/webhook/0c062513/*******'
        , notificationBaseValue: 2
        , serverList: [
            { type: 'API_AND_DATABASE', url: 'https://test.company.com/checkService', fail: false, failCount: 0, min: 0, max: 0 }
            , { type: 'HEALTH_CHECK', url: 'https://test.company.com/healthCheck', fail: false, failCount: 0, min: 0, max: 0 }
        ]
    }
    , live : {
        nateOnWebHook: 'https://teamroom.nate.com/api/webhook/0c062513/*******'
        , notificationBaseValue: 2
        , serverList: [
            { type: 'API_AND_DATABASE', url: 'https://test.company.com/checkService', fail: false, failCount: 0, min: 0, max: 0 }
            , { type: 'SOCKET', url: 'https://test.company.com/healthCheck', fail: false, failCount: 0, min: 0, max: 0 }
            , { type: 'HEALTH_CHECK', url: 'https://test.company.com/healthCheck', fail: false, failCount: 0, min: 0, max: 0 }
        ]
    }
};

exports.config = config;