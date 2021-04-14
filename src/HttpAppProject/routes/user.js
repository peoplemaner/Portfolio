exports.createUser = (req, res) => {
    const nickName = req.body.nickName;
    const password = req.body.password;
    const sex = req.body.sex;

    if (!nickName || !password || !sex) {
        res.json({errorCode:"9001", error: 'Params undefined', result: []});
    } else {
        const query = DB.query("INSERT INTO `user` (`nickName`, `password`, `sex`, `createData`) VALUES (?, ?, ?, NOW())", 
            [req.body.nickName, req.body.password, req.body.sex],
            (error, result) => {
                console.log(query.sql);
                if (error) {
                    console.log(error);
                    res.json({errorCode:"9000", error: 'Database Error', result: []});
                } else {
                    console.log(result);
                    res.json({errorCode:"0000", error: '', result: []});
                }
        });
    }
};

exports.login = (req, res) => {
    const nickName = req.body.nickName;
    const password = req.body.password;

    if (!nickName || !password) {
        res.json({errorCode:"9001", error: 'Params undefined', result: []});
    } else {
        const query = DB.query("SELECT * FROM user WHERE nickName = ? AND password = ?", [req.body.nickName, req.body.password], (error, result) => {
            console.log(query.sql);
            if (error) {
                console.log(error);
                res.json({errorCode:"9999", error: 'Database Error', result: []});
            } else {
                console.log(result[0]);
                if (result[0]) {
                    res.json({errorCode:"0000", error: '', result: result});
                } else {
                    res.json({errorCode:"0001", error: 'Can not found user', result: []});
                }
            }
        });
    }
};