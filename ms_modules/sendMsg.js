const connection = require('../connection')

module.exports = function (req, res) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        //console.log(str)
        let addSql = `INSERT INTO email(user,content,date,sendfrom,obj,flag)
         values('${str.user}','${str.content}','${str.date}','${str.sendfrom}','${str.obj}','0')`
        connection.query(addSql, (err) => {
            if (err) {
                res.send({
                    status: 0,
                    flag: false,
                    message: err
                })
                return
            }
            res.send({
                status: 200,
                flag: true,
                message: '已回复用户'
            })
        })

    })

}