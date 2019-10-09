const mysql = require('mysql')
/* 配置数据库 */

 module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'makeFriend'
})
 