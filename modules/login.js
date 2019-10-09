const Query = require('../utils/query')
const sql = require('../sql/login').login_sql //引入封装好的sql语句
module.exports = function (req, res) {

    let str = ""
    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        let obj = JSON.parse(str),
            success = {
                status: 2000,
                flag: true,
                message: "验证成功",
                data: {
                    token: ""
                }
            },
            errorPassword = {
                status: 0,
                flag: false,
                message: "密码错误"
            }
        //   let sql = 'select * from login where username=(?)'
        let data = [obj.username]

        Query(sql, data).then(resp => {
            if (resp[0].password == obj.password) {
                success.data.token = resp[0].id
                res.send(success)
            } else {
                res.send(errorPassword)
            }
        }).catch(err => {
            console.log(err)
        })
        
        //connection.end()

    })
}