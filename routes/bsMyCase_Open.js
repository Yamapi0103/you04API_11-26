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

// http://localhost:3000/case/bsMycase/1
router.route("/bsMycase/:sid")
.get(function(req, res) {
  //顯示廠商po的案子列表
  connection.query(
    "SELECT `BScase_sid`, `BScase_name`,`BScase_time_limit`, `BS_sid` FROM `bs_case` WHERE BS_sid=?",  //BS_sid為廠商的id
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      // if(results.length == 0 ){
      //   res.json(results);  //回傳 [{},{}....]
      // }
      res.json(results);  //回傳 [{},{}....]
    }
  );
})





/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
