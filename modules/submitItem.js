const connection = require('../connection')
module.exports = function (req, res) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str=JSON.parse(str)
       
        let sql = `INSERT INTO temporary(item_type,url,title,date,content,user) values('${str.item_type}','${str.url}','${str.title}','${str.date}','${str.content}','${str.user}')`
        connection.query(sql, (err, result) => {
            
            if (err) {
                res.send(err)
                return;
            }

            res.send({
                status: 2000,
                flag: true,
                message: '提交成功'
            })

        })
    })
}