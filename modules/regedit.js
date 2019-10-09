const connection = require('../connection')
const selectAll = require('../sql/regedit').selectAll
const addSql = require('../sql/regedit').regedit_insert;

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
                message: "注册成功"
            }


        let addSqlParams = [obj.username, obj.password];
      
            // if(result){

            connection.query(addSql, addSqlParams, (err) => {
                if (err) { res.send(err) }
                else {
                    res.send(success)
                }

            })
            
            // connection.end()
            // }
        



    })

}