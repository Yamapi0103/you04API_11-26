var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var {connection} =require('./connect_db')

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
=======
var {connection} =require('./connect_db');

>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
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