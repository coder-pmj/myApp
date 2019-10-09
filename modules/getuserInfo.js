const connection = require('../connection')
const sql = require('../sql/login').getuserinfo_sql//引入封装好的sql语句
module.exports = function (req, res) {

    let success = {
        status: 2000,
        flag: true,
        message: "获取成功",
        data: ""
    },

        error = {
            status: 0,
            flag: false,
            message: "用户不存在"
        }

    //   let sql = 'select * from login where username=(?)'
    let data = [req.params.id]

    connection.query(sql, data, (err, result) => {
        // console.log(result[0])
        if (result.length) {
            // success.data.token = result
            success.data=result[0]
            res.send(success)
        } else {
            res.send(error)
        }

    })


}