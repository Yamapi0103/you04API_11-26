var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    database: "U04",
    user: "root",
    password: "",
});

connection.connect();

// http://localhost:3000/api/contact_us
router.route('/contact_us')
    .post(function (req, res) {//新增資料
        connection.query("INSERT INTO contact_us SET ?", req.body, function (error) {
            if (error) throw error;
            res.json({ message: "成功送出" });
        })
    });



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;