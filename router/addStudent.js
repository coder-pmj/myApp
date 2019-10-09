const router = require('express').Router();
const connection = require('../connection')

router.post('/', function (req, res, next) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        connection.query('select * from student', (err, result) => {
            if (err) {
                return
            }
            let hasflag = result.some(v => {
                return v.sno == str.sno
            })
            if (hasflag) {
                res.send({
                    status: 0,
                    flag: false,
                    message: '学号已存在'
                })
            } else {
                let sql = `insert into student (name,sno,used) values('${str.name}','${str.sno}','0')`
                connection.query(sql, (err, result) => {
                    if (err) {
                        res.send({
                            status: 0,
                            flag: false,
                            message: err
                        })
                        return
                    }
                    res.send({
                        status: 2000,
                        flag: true,
                        message: '添加成功'
                    })
                })
            }
        })

    })
})
module.exports = router