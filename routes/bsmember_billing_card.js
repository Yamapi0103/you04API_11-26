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

// http://localhost:3000/bsbilling_api/:bs_email
router.route("/:bs_email")
.get(function(req, res) {
  //顯示廠商po的案子列表
  connection.query(
    "SELECT `BO_amount`, `BO_date`, `BO_method` FROM `bs_order` WHERE `BS_email`=?",
    req.params.bs_email,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
})

// http://localhost:3000/bsbilling_api/point/:bs_email
router.route("/point/:bs_email")
.get(function(req, res) {
  //顯示廠商po的案子列表
  connection.query(
    "SELECT `BS_point` FROM `bsmember` WHERE `BS_email`=?",
    req.params.bs_email,
    function(error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
})
module.exports = router;
