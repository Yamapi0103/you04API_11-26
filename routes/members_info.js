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


router.route("/icmembers")
.get(function(req, res) {
  connection.query(
    "select * FROM `icmember`",
    function(error, results) {
      if (error) throw error;
      res.json(results); //回傳[{}]
    }
  );
})

//網紅個資
// http://localhost:3000/info/icmembers/1
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
      res.json({message:'修改成功'}); 
    }
  );
});


//廠商個資
// http://localhost:3000/info/bsmembers/1
router.route("/bsmembers/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT `BS_email`, `BS_password`, `BS_name`, `BS_type`, `BS_phone`, `BS_link`, `BS_info` FROM `bsmember` WHERE BS_sid=?",
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
      res.json({message:'修改成功'}); 
    }
  );
});



//查詢各類網紅
//eg: http://localhost:3000/info/icmedia/youtube
router.route("/icmedia/:media")
  .get(function(req, res) {
    let ic_media = req.params.media;
    if(ic_media=="all"){
      connection.query(
        "SELECT * FROM `icmember`",function(error, results) {
          if (error) throw error;
          if(results.length ==0){
            res.json({Message:'找不到任何網紅'});  //回傳{}
          }
          else{}
            res.json(results); //回傳[{}]
          }
      );
    }  
  else{
    connection.query(
    "SELECT * FROM `icmember` WHERE IC_media=?",ic_media,function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查不到該類網紅'});  //回傳{}
      }
      else{}
        res.json(results); //回傳[{}]
      }
  );
}
});





/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
