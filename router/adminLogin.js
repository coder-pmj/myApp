const router = require('express').Router();
const connection = require('../connection')

router.post('/', function (req, res, next) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        //console.log(str)
        connection.query(`select * from admin where user='${str.user}'`, (err, result) => {
            if (result.length) {
                
                if (result[0].password == str.password) {
                    res.send({
                        status: 2000,
                        flag: true,
                        message: '登陆成功'
                    })
                } else {
                    res.send({
                        status: 0,
                        flag: false,
                        message: '密码错误'

                    })
                }
            } else {
                res.send({
                    status: 0,
                    flag: false,
                    message: '用户不存在'

                })
            }
        })

    })
})
module.exports = router