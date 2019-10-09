const connection = require('../connection')
const sql = require('../sql/login').login_sql //引入封装好的sql语句
module.exports = function (req, res) {

    let str = ""
    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {


        let success = {
            status: 2000,
            flag: true,
            message: "用户存在"
        },

            errorName = {
                status: 0,
                flag: false,
                message: "用户不存在"
            }

        //   let sql = 'select * from login where username=(?)'
        let data = [str]

        connection.query(sql, data, (err, result) => {
            // console.log(result)
            if (result.length) {
               // success.data.token = result
                res.send(success)
            } else {
                res.send(errorName)
            }

        })
        
        //connection.end()

    })
}