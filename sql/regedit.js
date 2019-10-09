
/* 定义全局查询语句 */
const selectAll = 'select * from user'

/* 定义注册插入语句 */
const regedit_insert = 'INSERT INTO user(username,password) VALUES(?,?)'

module.exports = {
    selectAll,
    regedit_insert,
   
}