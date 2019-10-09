const router = require('express').Router();
const connection = require('../connection')

router.post('/', function (req, res, next) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        let sql = `update email set flag='1' where id=${str.id}`
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
                message: 'ok'
            })
        })
    })
})
module.exports=router