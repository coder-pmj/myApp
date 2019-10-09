const connection = require('../connection')

module.exports = function (req, res) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        //console.log(str)
        connection.query(`delete from temporary where id =${str.id}`, (err) => {
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
                message: '删除成功'
            })
        })

    })

}