const connection = require('../connection')
const sql = require('../sql/getItem').selectAll

function getData(result, time) {
    return new Promise((resolve) => {
        for (let i = 0; i < result.length; i++) {
            connection.query(`select * from commentary where num1='${result[i].num}'`, (err, resp) => {
                result[i].comment = resp
            })
        }
        setTimeout(function () {
            resolve(result)
        }, time)
    })
}
async function pause(result, res) {
    try {
        let s = await getData(result, 1000)

        res.send({
            status: 2000,
            flag: true,
            message: "获取成功",
            data: s
        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = function (req, res) {


    let error = {
        status: 0,
        flag: false,
        message: "获取失败",
        data:[]
    }
    //let arr1 = new Date().getMilliseconds()
    connection.query(sql, (err, result) => {
        if (err) {
            res.send(err)
            return;
        }
        if (result.length) {

            pause(result, res)
            //console.log(result)

        } else {
            res.send(error)
        }
    })

    
   
}