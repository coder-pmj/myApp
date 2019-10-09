const connection = require('../connection')

module.exports = function (req, res) {

    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {

        let obj = JSON.parse(str)

        let sql = "select * from user where username=(?)"
        let params = [obj];

        // if(result){

        connection.query(sql, params, (err, result) => {
            if (err) { res.send(err) }
            else {
                res.send({
                    status: 2000,
                    flag: true,
                    message: '获取成功',
                    data: result
                })
            }

        })


    })

}