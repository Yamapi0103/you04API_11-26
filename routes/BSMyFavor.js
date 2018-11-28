var express = require('express');
var router = express.Router();
var mysql = require("mysql");

//建立連線
var connection = mysql.createConnection({
  host: "localhost",
  database: "U04",
  user: "root",
  password: "",
});

// connection.connect();
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


router
  .route("/BSMyFavor")
  .get(function (req, res) {
    connection.query("SELECT `IC_sid` FROM `bs_favor` WHERE `BS_sid`=1", function (error, rows) {
      if (error) throw error;
      res.json(rows);
    })
  })


module.exports = router;