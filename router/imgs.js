const router = require('express').Router();
const multer = require('multer');
var gFilename = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/images`)
    },
    filename: function (req, file, callback) {
        let index = file.mimetype.indexOf('/')
        let type = file.mimetype.substr(index + 1)//获取文件扩展名
        gFilename = `${Date.now()}.${type}`
        callback(null, gFilename);
    }
});

/*  */
const upload = multer({ storage: storage });

/* 上传动态图片 */
router.post('/', upload.single('file'), function (req, res, next) {
    //console.log(req)
    res.send({
        flag: true,
        url:req.file.filename
    })
    //connection.query('INSERT INTO commentary(num1,user,text) VALUES(?,?,?)')

});


module.exports = router;