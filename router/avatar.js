const router = require('express').Router();
const multer = require('multer');
var gFilename = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/avatar`)
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


/* 上传头像 */
router.post('/', upload.single('file'), function (req, res, next) {
    
    res.send({
        flag: true,
        url: req.file.filename
    })
})

module.exports = router;