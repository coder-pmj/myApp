const router = require('express').Router();
const connection = require('../connection')


/* 判断学号时否存在 */
router.post('/', function (req, res, next) {
    connection.query('select * from email', (err, result) => {
        if (err || !result) {
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
            data: result
        })
    })
})

module.exports = router;