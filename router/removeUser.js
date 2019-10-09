const router = require('express').Router();
const connection = require('../connection')


/* 判断学号时否存在 */
router.post('/', function (req, res, next) {

    let str = ""
    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)

        connection.query(`delete from user where id='${str.id}'`, (err, result) => {
            if (err) {
                res.send({
                    status: 0,
                    flag: false,
                    message: '服务器异常'
                })
                return
            }
            res.send({
                status: 2000,
                flag: true,
                message: '移除成功'
            })
        })


    })
})

module.exports = router;