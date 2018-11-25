var express = require("express");
var router = express.Router();
var mysql = require("mysql");

//建立連線
var connection = mysql.createConnection({
    host: "localhost",
    database: "you04",
    user: "root",
    password: ""
  });
connection.connect();

router.route('/')
 .get(function(req, res){
    connection.query("SELECT * FROM `BS_case`", function(error, result){
         if(error) throw error
         res.json(result)
    })
 })

router.route('/:page')
 .get(function(req, res){
     //先統計總共幾筆資料
     var query = "SELECT count(*) as TotalCount FROM `BS_case`";
     var totalCount = 0;
     connection.query(query, function(error, count_result){
         if (error) throw error;
         totalCount = count_result[0].TotalCount;

         //讀出分頁資料
         var limitNum = 10; // 一次讀取10筆資料
         var startNum = 0;  // 從第幾筆開始讀
         if (req.params.page) {
             page = parseInt(req.params.page);
             startNum = (page -1) * limitNum;
         }
         var query = "select * from `BS_case` limit ? OFFSET ?";
         var params = [limitNum, startNum];
         query = mysql.format(query, params);   //format是做字串的串接
         connection.query(query, function(error, count_result){
            if (error) throw error;
            res.json({ "TotalCount": totalCount, "datas": count_result });
         })
     })

 })


 module.exports = router;