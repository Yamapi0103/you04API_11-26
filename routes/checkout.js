var express = require("express");
var router = express.Router();
var {connection} =require('./connect_db')


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// http://localhost:3000/plan_buy
router
  .route("/")
  .post(function(req, res) {
    connection.query(
      "INSERT INTO `bs_order`(`BS_email`, `BO_amount`, `BO_point`, `BO_date`, `BO_method`, `BO_re_name`, `BO_re_email`, `BO_receipt`) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.email, req.body.amount, req.body.point, req.body.now, req.body.method, req.body.re_name, req.body.re_email, req.body.receipt],
      function(error) {
        if (error) throw error;
        res.json({ message: "結帳成功!!!", stay: false });
      }
    );
    connection.query(
      "UPDATE `bsmember` SET `BS_point`= `BS_point` + ? WHERE `BS_email`=?",
      [req.body.point, req.body.email],
      function(error) {
        if (error) throw error;
        // res.json({ message: "結帳成功!!!", stay: false });
      }
    );
  });

  
module.exports = router;
