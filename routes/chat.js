var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  database: "U04",
  user: "root",
  password: ""
});
connection.connect();

// --------------------------------------廠商頁
//顯示廠商發佈中且有人應徵的案子
// http://localhost:3000/chat/bsMyCase_showCase/1
router.route("/bsMyCase_showCase/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bs_case_detail` o JOIN `bs_case` d ON o.BScase_sid=d.BScase_sid WHERE d.BS_state=1 AND  d.BS_sid=?",  //BS_sid為廠商的id
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);  //回傳 [{},{}....]
    }
  );
})
//抓取網紅姓名
//http://localhost:3000/chat/bsMyCase_showIC/1
router.route("/bsMyCase_showIC/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT IC_name FROM `icmember` o  JOIN `bs_case_detail` d ON o.IC_sid=d.ICmember_sid  JOIN `bs_case` p ON p.BScase_sid=d.BScase_sid  WHERE p.BS_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);  //回傳 [{ICname:xxxx},{ICname:xxxx}]
    }
  );
})

//顯示對話-步驟1: 取得bs_case_detail的流水號sid
// http://localhost:3000/chat/bsMyCase_catch/1
router.route("/bsMyCase_catch/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT sid FROM `bs_case_detail` WHERE BScase_sid =?",   //利用案子的sid去抓bs_case_detail的流水號sid
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   //回傳 [{sid:15}]
    }
  );
})
//顯示對話-步驟2: 利用流水號sid分別抓bs_talk、ic_talk的談話資訊
// http://localhost:3000/chat/bsMyCase_showBSChat/1
router.route("/bsMyCase_showBSChat/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bs_talk` WHERE talk_sid=?",  
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   
    }
  );
})
// http://localhost:3000/chat/bsMyCase_showICChat/1
router.route("/bsMyCase_showICChat/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `ic_talk` WHERE talk_sid=?",  
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   
    }
  );
})
//傳送廠商的對話
// http://localhost:3000/chat/bsMyCase_sent
router.route("/bsMyCase_sent")
.post(function(req, res) {
  connection.query(
    "INSERT INTO `bs_talk`(`talk_sid`, `BS_content`, `time`) VALUE (?,?,?)",
    [req.body[0],req.body[1],req.body[2]],
    function(error, results) {
      if (error) throw error;
      res.json({message:'已上傳'});   
    }
  );
})

// --------------------------------------網紅頁
//顯示該網紅應徵的案子
// http://localhost:3000/chat/icMyCase_showCase/1
router.route("/icMyCase_showCase/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bs_case_detail` o JOIN `bs_case` d ON o.BScase_sid=d.BScase_sid WHERE d.BS_state=1 AND  o.ICmember_sid=?",  
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);  //回傳 [{},{}....]
    }
  );
})
// //抓取網紅姓名
// //http://localhost:3000/chat/bsMyCase_showIC/1
// router.route("/bsMyCase_showIC/:sid")
// .get(function(req, res) {
//   connection.query(
//     "SELECT IC_name FROM `icmember` o  JOIN `bs_case_detail` d ON o.IC_sid=d.ICmember_sid  JOIN `bs_case` p ON p.BScase_sid=d.BScase_sid  WHERE p.BS_sid=?",
//     req.params.sid,
//     function(error, results) {
//       if (error) throw error;
//       res.json(results);  //回傳 [{ICname:xxxx},{ICname:xxxx}]
//     }
//   );
// })

//顯示對話-步驟1: 取得bs_case_detail的流水號sid
// http://localhost:3000/chat/icMyCase_catch/1
router.route("/icMyCase_catch/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT sid FROM `bs_case_detail` WHERE BScase_sid =?",   //利用案子的sid去抓bs_case_detail的流水號sid
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   //回傳 [{sid:15}]
    }
  );
})
//顯示對話-步驟2: 利用流水號sid分別抓bs_talk、ic_talk的談話資訊
// http://localhost:3000/chat/icMyCase_showBSChat/1
router.route("/icMyCase_showBSChat/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bs_talk` WHERE talk_sid=?",  
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   
    }
  );
})
// http://localhost:3000/chat/icMyCase_showICChat/1
router.route("/icMyCase_showICChat/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `ic_talk` WHERE talk_sid=?",  
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      res.json(results);   
    }
  );
})
//傳送網紅的對話
// http://localhost:3000/chat/icMyCase_sent
router.route("/icMyCase_sent")
.post(function(req, res) {
  connection.query(
    "INSERT INTO `ic_talk`(`talk_sid`, `IC_content`, `time`) VALUE (?,?,?)",
    [req.body[0],req.body[1],req.body[2]],
    function(error, results) {
      if (error) throw error;
      res.json({message:'已上傳'});   
    }
  );
})




/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
