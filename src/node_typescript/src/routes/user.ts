import express from 'express';

const user = {
    createUser: (req: express.Request , res: express.Response, db: any) => {
        const nickName = req.body.nickName;
        const password = req.body.password;
        const sex = req.body.sex;
    
        if (!nickName || !password || sex == undefined) res.json({errorCode:"9001", error: 'Params undefined', result: []});
        else {
            const query = db.query("INSERT INTO `user` (`nickName`, `password`, `sex`, `createData`) VALUES (?, ?, ?, NOW())", 
                [req.body.nickName, req.body.password, req.body.sex],
                (error: any, result: any) => {
                    console.log(query.sql);
                    if (error) {
                        console.log(error);
                        if (error.errno == 1062) res.json({errorCode:"1000", error: 'Duplicate nickName', result: []});
                        else res.json({errorCode:"9000", error: 'Database Error', result: []});
                    } else {
                        console.log(result);
                        res.json({errorCode:"0000", error: '', result: []});
                    }
            });
        }
    }, 
    login: (req: express.Request , res: express.Response, db: any) => {
        const nickName = req.body.nickName;
        const password = req.body.password;
    
        if (!nickName || !password) res.json({errorCode:"9001", error: 'Params undefined', result: []});
        else {
            const query = db.query("SELECT * FROM user WHERE nickName = ? AND password = ?", [req.body.nickName, req.body.password], (error: any, result: any) => {
                console.log(query.sql);
                if (error) {
                    console.log(error);
                    res.json({errorCode:"9999", error: 'Database Error', result: []});
                } else {
                    console.log(result[0]);
                    if (result[0]) res.json({errorCode:"0000", error: '', result: result});
                    else res.json({errorCode:"1001", error: 'ID or Password Invalid', result: []});
                }
            });
        }
    }    
};
/*
exports.createUser = (req: express.Request , res: express.Response, db: any) => {
    const nickName = req.body.nickName;
    const password = req.body.password;
    const sex = req.body.sex;

    if (!nickName || !password || sex == undefined) res.json({errorCode:"9001", error: 'Params undefined', result: []});
    else {
        const query = db.query("INSERT INTO `user` (`nickName`, `password`, `sex`, `createData`) VALUES (?, ?, ?, NOW())", 
            [req.body.nickName, req.body.password, req.body.sex],
            (error: any, result: any) => {
                console.log(query.sql);
                if (error) {
                    console.log(error);
                    if (error.errno == 1062) res.json({errorCode:"1000", error: 'Duplicate nickName', result: []});
                    else res.json({errorCode:"9000", error: 'Database Error', result: []});
                } else {
                    console.log(result);
                    res.json({errorCode:"0000", error: '', result: []});
                }
        });
    }
};*/

export default user;

exports.login = (req: express.Request , res: express.Response, db: any) => {
    const nickName = req.body.nickName;
    const password = req.body.password;

    if (!nickName || !password) res.json({errorCode:"9001", error: 'Params undefined', result: []});
    else {
        const query = db.query("SELECT * FROM user WHERE nickName = ? AND password = ?", [req.body.nickName, req.body.password], (error: any, result: any) => {
            console.log(query.sql);
            if (error) {
                console.log(error);
                res.json({errorCode:"9999", error: 'Database Error', result: []});
            } else {
                console.log(result[0]);
                if (result[0]) res.json({errorCode:"0000", error: '', result: result});
                else res.json({errorCode:"1001", error: 'ID or Password Invalid', result: []});
            }
        });
    }
};