var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  database: "U04",
  user: "root",
  password: "",
});
connection.connect();

// http://localhost:3000/api3/bsmembers/1
router.route("/bsmembers/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT `BS_email`, `BS_password`, `BS_name`, `BS_type`, `BS_phone`, `BS_link`, `BS_info`,`BS_point` FROM `bsmember` WHERE BS_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查無此帳號'});
      }
      else{
        res.json(results); //{}
      }
    }
  );
})
.put(function(req, res) {
  connection.query(
    "UPDATE `bsmember` SET `BS_email`=?,`BS_password`=?,`BS_name`=?,`BS_type`=?,`BS_phone`=?,`BS_link`=?,`BS_info`=?,`BS_create_at`=? WHERE BS_sid=?",
    [
        req.body.BS_email,
        req.body.BS_password,
        req.body.BS_name
        ,req.body.BS_type
        ,req.body.BS_phone
        ,req.body.BS_link
        ,req.body.BS_info
        ,req.body.BS_create_at
        ,req.params.sid
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
