const mysql = require('mysql')
/* 配置数据库 */

 module.exports = mysql.createConnection({
    host: '47.99.139.125',
    port:'3306',
    user: 'root',
    password: '123456',
    database: 'makeFriend'
})
 