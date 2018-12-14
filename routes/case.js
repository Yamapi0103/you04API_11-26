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
// ---------------------------------網紅頁
//網紅查看應徵的案子
// http://localhost:3000/case/icMyCase_Open/1
router.route("/icMyCase_Open/:sid")
.get(function(req, res) {
  connection.query(
  //  "SELECT * FROM `bs_case_detail` o JOIN `bs_case` d ON o.BScase_sid=d.BScase_sid WHERE o.ICmember_sid=? AND BS_state=1",
  "SELECT * FROM `bs_case_detail` o JOIN `bs_case` d ON o.BScase_sid=d.BScase_sid JOIN `bsmember` s ON s.BS_sid=d.BS_sid WHERE o.ICmember_sid=? AND BS_state=1",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results); 
    }
  );
});

//網紅查看結案的案子
// http://localhost:3000/case/icMyCase_Close/1
router
  .route("/icMyCase_Close/:sid")
  
  .get(function(req, res) {
    connection.query(
      "SELECT * FROM `bs_case_detail` o JOIN `bs_case` d ON o.BScase_sid=d.BScase_sid JOIN `bsmember` s ON s.BS_sid=d.BS_sid WHERE o.ICmember_sid=? AND BS_state=0",
      req.params.sid,
      function(error, results) {
        if (error) throw error;
        res.json(results); 
      }
    );
  })

// --------------------------------------廠商頁
//廠商發佈的案子列表
// http://localhost:3000/case/bsMyCase_Open/1
router.route("/bsMyCase_Open/:sid")
.get(function(req, res) {
  //顯示廠商po的案子列表
  connection.query(
    "SELECT * FROM `bs_case` WHERE BS_sid=? AND BS_state=1",  //BS_sid為廠商的id
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);  //回傳 [{},{}....]
    }
  );
})

//廠商查看應徵網紅
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

//廠商關閉案子
// http://localhost:3000/case/bsMycase_Close/1
router
  .route("/bsMycase_Close/:sid")
  //取出該廠商已結案的案子
  .get(function(req, res) {
    connection.query(
      "SELECT * FROM `bs_case` WHERE BS_sid=? AND BS_state=0",
      req.params.sid,
      function(error, results) {
        if (error) throw error;
        res.json(results);  //回傳 [{},{}....]
      }
    );
  })
  .put(function(req, res) {
    //當廠商按下結案時 => 到bs_case資料表把BS_state設為0
    connection.query(
      "UPDATE `bs_case` SET `BS_state`=0 WHERE BScase_sid=?",
      req.params.sid,
      function(error, results) {
        if (error) throw error;
        res.json({ message: "已結案" });
      }
    );
  });









/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
