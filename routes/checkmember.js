var express = require("express");
var router = express.Router();
<<<<<<< HEAD
var {connection} =require('./connect_db')

//建立連線

// connection.connect();
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

  //抓廠商的名字
  // http://localhost:3000/you04/BSmemberInfo/1
  router
  .route("/BSmemberInfo/:sid")
  .get(function (req, res) {
    connection.query("SELECT * FROM `bsmember` WHERE `BS_sid`=?", 
    req.params.sid, 
    function (error, rows) {
      if (error) throw error;
      res.json(rows);

    })
  })
  //抓網紅的名字
  // http://localhost:3000/you04/ICmemberInfo/1
  router
  .route("/ICmemberInfo/:sid")
  .get(function (req, res) {
    connection.query("SELECT * FROM `icmember` WHERE `IC_sid`=?", 
    req.params.sid, 
    function (error, rows) {
      if (error) throw error;
      res.json(rows);

    })
  })

module.exports = router;
