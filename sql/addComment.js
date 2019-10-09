
/* 定义全局查询语句 */
const selectAll = 'select * from commentary'

/* 定义插入语句 */
const comment_insert = 'INSERT INTO commentary(num1,user,text) VALUES(?,?,?)'

module.exports = {
    selectAll,
    comment_insert,

}