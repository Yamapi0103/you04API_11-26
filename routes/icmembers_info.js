var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  database: "you04",
  user: "root",
  password: ""
});

connection.connect();

// http://localhost:3000/api2/icmembers
router.route("/icmembers/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `icmember` WHERE IC_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查無此帳號'});  //回傳{}
      }
      else{
        res.json(results); //回傳[{}]
      }
    }
  );
})
.put(function(req, res) {
  connection.query(
    "UPDATE `icmember` SET ? WHERE `IC_sid`=?",
    // "UPDATE `icmember` SET `IC_email`=?,`IC_password`=?,`IC_name`=?,`IC_create_at`=? WHERE IC_sid=?",
    [
        req.body,
        req.params.sid
    ],
    function(error, results) {
      if (error) throw error;
      res.json(results); //{}
    }
  );
});




/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
