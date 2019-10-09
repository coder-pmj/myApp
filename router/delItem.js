const router = require('express').Router();
const connection = require('../connection')
const fs = require('fs')
const path = require('path');
let base = path.join(__dirname, '../public/images/')
router.delete('/', function (req, res) {

    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {

        let obj = JSON.parse(str),
            success = {
                status: 2000,
                flag: true,
                message: "删除成功"
            }

        let deleImg = obj.url

        let delSql = `delete from item where id=${obj.id}`


        connection.query('select * from item', (err, result) => {

            let indexArr = []
            for (let i = 0; i < result.length; i++) {
                indexArr.push(result[i].id)
            }
            let index = indexArr.indexOf(obj.id)//22

            for (let i = index + 1; i < result.length; i++) {
                connection.query(`update item set num='${i}' where id='${result[i].id}'`)
            }
        })



        // if(result){

         connection.query(delSql, (err) => {
            if (err) {
                res.send({
                    status: 0,
                    flag: false,
                    message: "删除失败"
                })
                return
            }


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


        }) 


    })

})
module.exports = router