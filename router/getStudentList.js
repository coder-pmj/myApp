const router = require('express').Router();
const connection = require('../connection')

router.post('/', function (req, res, next) {
    connection.query('select * from student', (err, result) => {
        if (err|!result) {
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
            message: '查询成功',
            data: result
        })
    })
})
module.exports = router