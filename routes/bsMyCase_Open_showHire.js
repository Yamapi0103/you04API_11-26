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

// http://localhost:3000/case/showHire/1
router.route("/showHire/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bs_case_detail` o JOIN `icmember` d ON o.ICmember_sid=d.IC_sid WHERE o.BScase_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results); 
    }
  );
})



/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
