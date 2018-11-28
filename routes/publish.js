var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var multer  = require('multer');
var upload = multer({ dest: 'public/images/uploads/' });

var connection = mysql.createConnection({
  host: "localhost",
  database: "U04",
  user: "root",
  password: "",
});

// connection.connect();
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//localhost/3000/api/publish
router.route("/publish")
  .get(function(req, res) {//讀所有資料
    connection.query("SELECT * FROM BS_case",function(error, results){
        if(error) throw error;
        res.json(results);
    })
  }) 
  .post(function(req, res) {//新增資料
    connection.query("INSERT INTO BS_case SET ?", req.body, function(error){
        if(error) throw error;
        res.json({message:"新增成功"});
    })
  }); 
  
//localhost/3000/api/publish/:id
router
  .route("/publish/:id")
  .get(function(req, res) {
    connection.query("SELECT * FROM Bs_case WHERE BScase_sid=?", req.params.id, function(error, results){
        if(error) throw error;
        res.json(results)
    })
  }) 
  .put(function(req, res) {//修改資料
    connection.query("UPDATE BS_case SET ? WHERE BScase_sid=?",[req.body, req.params.id], function(error, results){
        if(error) throw error;
        res.json({message:"修改成功"});
    })
  }) 
  .delete(function(req, res) {//刪除資料
    connection.query("DELETE FROM BS_case WHERE BScase_sid=?", req.params.id,function(error,results){
        if(error) throw error;
        res.json({message:"刪除成功！"})
    })
  }); 


module.exports = router;
