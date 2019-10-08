const connection = require('../connection')

module.exports = function (req, res) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on("end", function () {
        str = JSON.parse(str)
        //console.log(str)
        connection.query('select * from item', (err, result) => {
            //  console.log(result.length)
            let numlength = result.length
            let indexlength = result.filter(v => v.item_type != 'h').length

            /* 删除临时表中的数据 */
            connection.query(`delete from temporary where id='${str.id}'`)
            //  console.log(numlength)
            let sql = ""
            if (str.item_type != 'h') {
                sql = `INSERT INTO item(item_type,url,title,date,content,user,num,ind,sno) values('${str.item_type}','${str.url}','${str.title}','${str.date}','${str.content}','${str.user}','${numlength + 1}','${indexlength + 1}','${str.sno}')`
            } else {
                sql = `INSERT INTO item(item_type,url,title,date,content,user,num,sno) values('${str.item_type}','${str.url}','${str.title}','${str.date}','${str.content}','${str.user}','${numlength + 1}','${str.sno}')`
            }
            connection.query(sql, (err, result) => {

                if (err) {
                    res.send(err)
                    return;
                }

                res.send({
                    status: 2000,
                    flag: true,
                    message: '上线成功'
                })

            })
        })

    })

}