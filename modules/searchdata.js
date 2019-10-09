const connection = require('../connection')
module.exports = function (req, res) {
    let str = ""

    req.on("data", function (dt) {
        str += dt
    })
    req.on('end', function () {

        connection.query('select * from item', (err, result) => {

            let arr = []
            if (result) {
                arr = result.filter((v) => {
                    return v.title.includes(str) || checkStr(v.title, str)
                })
            }

            if (arr.length) {
                pause(arr, res)
            } else {
                res.send({
                    status: 0,
                    flag: false,
                    message: '没有找到相关信息',
                    data: []
                })
            }
        })

    })


    function checkStr(o, s) {
        //o为数据库中的文字内容，s为用户输入的关键字
        let arro = o.split(''),
            arrs = s.split('')

        let flag = arro.some(v => {
            // return v == s
            let flag = false
            arrs.forEach(k => {
                if (v == k) {
                    flag = true
                }
            });
            return flag
        })
        return flag
    }


    function getData(result, time) {
        return new Promise((resolve) => {
            for (let i = 0; i < result.length; i++) {
                connection.query(`select * from commentary where num1='${result[i].num}'`, (err, resp) => {
                    result[i].comment = resp
                    result[i].newId = i
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
                message: '查询成功',
                data: s
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}