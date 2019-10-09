const express = require('express')

const app = express()
const login = require('./modules/login')
const regedit = require('./modules/regedit')
const hasuser = require('./modules/hasuser')
const getuserInfo = require('./modules/getuserInfo')
const getItem = require('./modules/getItem')
const addComment = require('./modules/addComment')
const searchdata = require('./modules/searchdata')

const imgs = require('./router/imgs')
const avatar = require('./router/avatar')
const checkSno = require('./router/checkSno')
const delItem = require('./router/delItem')
const getMsg = require('./router/getMsg')
const translate = require('./router/translate')
const getStudentList = require('./router/getStudentList')
const resetRegedit = require('./router/resetRegedit')
const addStudent = require('./router/addStudent')
const getuserList = require('./router/getuserList')
const removeUser = require('./router/removeUser')
const adminLogin = require('./router/adminLogin')
const delMsg=require('./router/delMsg')

const submitItem = require('./modules/submitItem')
const getUserName = require('./modules/getUserName')
const adduserInfo = require('./modules/adduserInfo')

const admin_getItem = require('./ms_modules/getItem')
const handleYes = require('./ms_modules/handleYes')
const handleNo = require('./ms_modules/handleNo')
const sendMsg = require('./ms_modules/sendMsg')

/* 暴露服务器静态资源 */
app.use(express.static('public'))

/* 用户登录 */
app.post('/login', login)

/* 用户是否存在 */
app.post('/login/hasuser', hasuser)

/* 获取用户信息 */
app.get('/login/info/:id', getuserInfo)

/* 用户注册 */
app.post('/regedit', regedit)

/* 获取item信息 */
app.post('/item', getItem)

/* 添加评论 */
app.post('/commentary', addComment)

/* 根据搜索框回显数据 */
app.post('/search', searchdata)

/* 图片上传 */
app.use('/upload/imgs', imgs)

/* 头像上传 */
app.use('/upload/avatar', avatar)

/* 判断学号是否存在 */
app.use('/checksno', checkSno)

/* 删除动态 */
app.use('/del', delItem)

/* 获取系统消息 */
app.use('/getmsg', getMsg)

/* 更改阅读状态 */
app.use('/translateflag', translate)

/* 删除已读消息 */
app.use('/delmsg',delMsg)

/* 提交item */
app.post('/submititem', submitItem)

/* 获取用户 */
app.post('/getuser', getUserName)

/* 完善个人资料 */
app.post('/addpersonal', adduserInfo)

//捕获错误
app.use(function (err, req, res, next) {
    res.send(err.toString());
});



/*==== 后台服务 ====*/

/* 管理员登录 */
app.use('/admin/login', adminLogin)

/* 获取审核表数据 */
app.post('/admin/item', admin_getItem)

/* 审核通过 */
app.post('/admin/handleyes', handleYes)

/* 审核不通过 */
app.post('/admin/handleno', handleNo)

/* 回复用户 */
app.post('/admin/sendmsg', sendMsg)

/* 获取学生信息 */
app.use('/admin/getstudentlist', getStudentList)

/* 重置可注册 */
app.use('/admin/resetregedit', resetRegedit)

/* 新增学生 */
app.use('/admin/addstudent', addStudent)

/* 获取用户 */
app.use('/admin/userlist', getuserList)

/* 移除用户 */
app.use('/admin/removeuser', removeUser)

app.listen(3000, () => console.log('localhost:3000 '))