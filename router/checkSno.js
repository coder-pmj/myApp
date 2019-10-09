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

        connection.query(`select * from student where sno='${str}'`, (err, result) => {

            if (result.length) {
                if (result[0].used != '1') {
                    res.send({
                        status: 2000,
                        flag: true,
                        message: '查询成功',
                        data: result[0]
                    })
                } else {
                    res.send({
                        status: 0,
                        flag: false,
                        message: '学生信息已被使用',
                        data: {}
                    })
                }
            } else {
                res.send({
                    status: 0,
                    flag: false,
                    message: '未找到相关学号学生信息',
                    data: {}
                })
            }
        })


    })
})

module.exports = router;