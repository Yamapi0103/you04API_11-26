var express = require('express');
var router = express.Router();

const multer = require('multer');
var {connection} =require('./connect_db');


connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//設定上傳檔案的資料夾
// var upload = multer({ dest: 'public/uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

//上傳圖片
router.post('/upload', upload.single('image'), function (req, res, next) {
    res.send(req.file);
})

router
    .route("/upload_name")
    .get(function (req, res) {//讀所有資料
        connection.query("SELECT * FROM community ORDER BY `id` DESC LIMIT 1", function (error, rows) {
            if (error) throw error;
            res.json(rows);
        })
    })
    .post(function (req, res) {//新增資料
        var _user = req.body;
        connection.query("insert into community set ?", _user, function (error) {
            if (error) throw error;
            res.json({ message: "新增成功" });
        })
    });

module.exports = router;