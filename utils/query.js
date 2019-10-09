const mysql = require('mysql')
/* 配置数据库 */
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'makeFriend'
})

module.exports = function(sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (err, res) => {
            if (res.length) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })
}