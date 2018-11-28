var express = require("express");
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

//home
// http://localhost:3000/you04
router
  .route("/")
  .get(function (req, res) {
    res.send('welcome to checkmember');
  })
// http://localhost:3000/you04/checkicmember
router
  .route("/checkicmember")
  .get(function (req, res) {
    // res.send('icmembers get test');
    connection.query("select * from icmember", function (error, rows) {
      if (error) throw error;
      res.json(rows);
    })
  })
// http://localhost:3000/you04/checkicmember/:id
router
  .route("/checkicmember/:email/:password")
  .get(function (req, res) {
    let [email, password] = [req.params.email, req.params.password];
    // res.send(email+','+password)
    // res.send("get icmember " + req.params.email+"...."+req.params.password);
    // res.send("get icmembers " + req.params.email+',');
    connection.query("select * from icmember where IC_email=? and IC_password=?", [email,password], function (error, rows) {
      if (error) throw error;
      // res.send(rows)
      res.json(rows);
      // if(rows.length==0)
      // res.json({ message: "登入失敗" });
      // else
      // res.json({ message: "登入成功" });
    })
  })



// http://localhost:3000/you04/checkbsmember
router
  .route("/checkbsmember")
  .get(function (req, res) {
    connection.query("select * from bsmember", function (error, rows) {
      if (error) throw error;
      res.json(rows);
    })
  })

  // http://localhost:3000/you04/checkbsmember
  router
  .route("/checkbsmember/:email/:password")
  .get(function (req, res) {
    let [email, password] = [req.params.email, req.params.password];
    // res.send(email+','+password)
    // res.send("get icmember " + req.params.email+"...."+req.params.password);
    // res.send("get icmembers " + req.params.email+',');
    connection.query("select * from bsmember where BS_email=? and BS_password=?", [email,password], function (error, rows) {
      if (error) throw error;
      // res.send(rows)
      res.json(rows);
      // if(rows.length==0)
      // res.json({ message: "登入失敗" });
      // else
      // res.json({ message: "登入成功" });
    })
  })

module.exports = router;
