const connection = require('../connection')
const fs = require('fs')
const path = require('path');
let base = path.join(__dirname, '../public/avatar/')

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
                message: "设置成功"
            }

        let deleImg = obj.oldavatar

        let addSql = `update user
         set name='${obj.name}',
         phone='${obj.phone}',
         sno='${obj.sno}',
         sex='${obj.sex}',
         qq='${obj.qq}',
         descript='${obj.descript}',
         avatar='${obj.avatar}'
         where id=${obj.id}`

         

         let addSql2 = `update student set used='1' where sno='${obj.sno}'`

        // if(result){

        connection.query(addSql, (err) => {
            if (err) {
                res.send({
                    status: 0,
                    flag: false,
                    message: "设置失败"
                })
            }
            else {
                connection.query(addSql2)
                if (deleImg) {
                    fs.unlink(base + deleImg, function (error) {
                        if (error) {
                            console.log(error);
                            return false;
                        }
                        console.log('删除文件成功');
                    })
                }
                res.send(success)
            }

        })


    })

}