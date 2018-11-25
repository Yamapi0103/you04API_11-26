var express = require("express");
var router = express.Router();
var mysql = require("mysql");

//建立連線
var connection = mysql.createConnection({
  host: "localhost",
  database: "you04",
  user: "root",
  password: ""
});
// connection.connect();
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


//更新點數後,修改bsmember內的點數值
  // http://localhost:3000/you04/updateBSmember
  router
  .route("/updateBSmember/:sid")
  .put(function (req, res) {
    connection.query("UPDATE `bsmember` SET ? WHERE `BS_sid`=?",[req.body, req.params.sid], function (error) {
      if (error) throw error;
      res.json({ message: "修改成功" });
    })
  })
  .get(function (req, res) {
    connection.query("select * from `bsmember` WHERE `BS_sid`=?",req.params.sid, function (error, rows) {
      if (error) throw error;
      // res.send(rows)
      res.json(rows);
    })
  })

module.exports = router;
