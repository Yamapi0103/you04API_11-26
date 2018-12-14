var express = require("express");
var router = express.Router();
<<<<<<< HEAD
var {connection} =require('./connect_db')


connection.connect(function(err) {
=======
var {connection} =require('./connect_db');


connection.connect(function (err) {
>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

router.route('/new')
 .get(function(req, res){
    connection.query("SELECT * FROM `bs_case` WHERE 1 ORDER BY `BScase_sid`DESC Limit 3", function(error, result){
         if(error) throw error
         res.json(result)
    })
 })

 router.route('/hot')
 .get(function(req, res){
    connection.query("SELECT * FROM `bs_case` WHERE 1 ORDER BY `BScase_ask_people`DESC Limit 3", function(error, result){
         if(error) throw error
         res.json(result)
    })
 })

// router.route('/:page')
//  .get(function(req, res){
//      //先統計總共幾筆資料
//      var query = "SELECT count(*) as TotalCount FROM `BS_case`";
//      var totalCount = 0;
//      connection.query(query, function(error, count_result){
//          if (error) throw error;
//          totalCount = count_result[0].TotalCount;

//          //讀出分頁資料
//          var limitNum = 10; // 一次讀取10筆資料
//          var startNum = 0;  // 從第幾筆開始讀
//          if (req.params.page) {
//              page = parseInt(req.params.page);
//              startNum = (page -1) * limitNum;
//          }
//          var query = "select * from `BS_case` limit ? OFFSET ?";
//          var params = [limitNum, startNum];
//          query = mysql.format(query, params);   //format是做字串的串接
//          connection.query(query, function(error, count_result){
//             if (error) throw error;
//             res.json({ "TotalCount": totalCount, "datas": count_result });
//          })
//      })
//  })


 module.exports = router;