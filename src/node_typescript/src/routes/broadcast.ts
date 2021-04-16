import express from 'express'

const broadcast = {
    createBroadcast: (req: express.Request, res: express.Response, db: any) => {
        const userIndex = req.body.userIndex;
        const title = req.body.title;
        const type = req.body.type;
    
        if (!userIndex || !title || type == undefined) res.json({errorCode:"9001", error: 'Params undefined', result: []});
        else {
            const query = db.query("INSERT INTO `broadcasts` (`userIndex`, `title`, `type`, `createDate`) VALUES (?, ?, ?, NOW())", 
                [req.body.userIndex, req.body.title, req.body.type],
                (error: any, result: any) => {
                    console.log(query.sql);
                    if (error) {
                        console.log(error);
                        res.json({errorCode:"9999", error: 'Database Error', result: []});
                    } else {
                        console.log(result);
                        res.json({errorCode:"0000", error: '', result: []});
                    }
            });
        }
    },
    getBroadCasts: (req: express.Request, res: express.Response, db: any) => {
        let queryStr = 'SELECT * FROM broadcasts';
        const type = req.query.type || '';
        if (type !== '') queryStr += ` WHERE type = ${type}`;
    
        const query = db.query(queryStr, (error: any, result: any) => {
            console.log(query.sql);
            if (error) {
                console.log(error);
                res.json({errorCode:"9999", error: 'Database Error', result: []});
            } else {
                console.log(result[0]);
                if (result[0]) res.json({errorCode:"0000", error: '', result: result});
                else res.json({errorCode:"0001", error: 'Can not found user', result: []});
            }
        });
    }
}

export default broadcast;