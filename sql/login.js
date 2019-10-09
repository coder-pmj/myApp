
/* 定义全局查询语句 */
const selectAll = 'select * from user'

/* 定义登录验证查询语句 */
const login_sql = 'select * from user where username=(?)'


/* 根据id获取用户信息 */
const getuserinfo_sql = 'select * from user where id=(?)'
module.exports = {
    selectAll,
    login_sql,
    getuserinfo_sql
}