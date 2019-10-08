const connection = require('../connection')
module.exports = function (req, res) {
    let success = {
        status: 2000,
        flag: true,
        message: '获取成功',
        data: null
    },
        none = {
            statue: 0,
            flag: false,
            message: '暂无数据',
            data: []
        }

    connection.query('select * from temporary', (err, result) => {
        if (result.length) {
            //console.log(result)
            success.data = result
            res.send(success)
        } else {
            res.send(none)
        }
    })
}