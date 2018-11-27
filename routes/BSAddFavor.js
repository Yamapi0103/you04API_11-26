var express = require('express');
var router = express.Router();
var mysql = require("mysql");


//建立連線
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'you04',
});

// connection.connect();
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//localhost/3000/api/BSAddFavor
router.route("/BSAddFavor")
  .post(function(req, res) {//收藏網紅
    connection.query("insert into bs_favor SET ?", req.body, function(error){
        if(error) throw error;
        res.json({message:"已收藏"});
    })
  })
  .get(function(req, res) {//收藏網紅
    connection.query("select * from bs_favor", function(error,rows){
        if(error) throw error;
        res.json(rows)
        // res.json({message:"get成功"});
    })
  }); 



router
  .route("/BSAddFavor/:id")
  // .get(function(req, res) {
  //   connection.query("SELECT * FROM Bs_case WHERE BScase_sid=?", req.params.id, function(error, results){
  //       if(error) throw error;
  //       res.json(results)
  //   })
  // }) 

.delete(function(req, res) {//刪除收藏
    connection.query("DELETE FROM  bs_favor WHERE BF_sid=?", req.params.id,function(error,results){
        if(error) throw error;
        res.json({message:"刪除成功！"})
    })
  }); 


module.exports = router;