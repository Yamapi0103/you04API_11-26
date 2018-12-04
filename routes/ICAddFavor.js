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

// http://localhost:3000/api/ICAddFavor
router
  .route("/ICAddFavor")
  .post(function (req, res) {
    //先檢查有沒有收藏過了
    connection.query(
      "SELECT * FROM `ic_favor` WHERE BScase_sid=? AND ICmember_sid=?",
      [req.body.BScase_sid, req.body.ICmember_sid],
      function (error, results) {
        if (error) throw error;
        if (results.length == 1) {
          res.json({ message: '已收藏' });
          console.log("a")
        }
        else {
          //之前沒收藏 => 可以收藏
          connection.query(
            "INSERT INTO `ic_favor`(`BScase_sid`, `ICmember_sid`) VALUES (?,?)",
            [req.body.BScase_sid, req.body.ICmember_sid],
            function (error) {
              if (error) throw error;
              res.json({ message: "收藏成功" });
              console.log("b")
            }
          );
        }
      }
    );
  });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


router.route("/ICAddFavor/:sid")
  .get(function (req, res) {
    //顯示廠商po的案子列表
    connection.query(
      "SELECT * FROM `ic_favor`o JOIN `bs_case` p ON o.BScase_sid =p.BScase_sid  WHERE o.ICmember_sid=? AND p.BS_state=1",  //IC_sid為廠商的id
      req.params.sid,
      function (error, results) {
        if (error) throw error;
        res.json(results);  //回傳 [{},{}....]
      }
    );
  })

module.exports = router;


// var express = require('express');
// var router = express.Router();
// var mysql = require("mysql");


// //建立連線
// var connection = mysql.createConnection({
//   host: "localhost",
//   database: "u04",
//   user: "root",
//   password: "",
// });

// // connection.connect();
// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// //localhost/3000/api/ICAddFavor
// router.route("/ICAddFavor")
//   .post(function (req, res) {//收藏專案
//     connection.query("insert into ic_favor SET ?", req.body, function (error) {
//       if (error) throw error;
//       res.json({ message: "已收藏" });
//     })
//   })
//   .get(function (req, res) {//收藏專案
//     connection.query("select * from ic_favor", function (error, rows) {
//       if (error) throw error;
//       res.json(rows)
//       // res.json({message:"get成功"});
//     })
//   });



// router
//   .route("/ICAddFavor/:id")
//   .get(function (req, res) {
//     connection.query("SELECT `bscase_sid` FROM `ic_favor` WHERE `ic_sid`=?", req.params.id, function (error, rows) {
//       if (error) throw error;
//       res.json(rows);
//     })
//   })

//   .delete(function (req, res) {//刪除收藏
//     connection.query("DELETE FROM  ic_favor WHERE if_sid=?", req.params.id, function (error, results) {
//       if (error) throw error;
//       res.json({ message: "刪除成功！" })
//     })
//   });

// //   http://localhost:3000/api/icGetFavor/1/2
// router
//   .route("/ICGetFavor/:icsid/:bscasesid'")
//   .get(function (req, res) {//取得ic_sid收藏
//     connection.query("SELECT `if_sid` FROM `ic_favor` WHERE `ic_sid`=? AND `bscase_sid`=?", [req.params.bscasesid, req.params.bscase_sid], function (error, results) {
//       if (error) throw error;
//       res.json(results)
//     })
//   });


// module.exports = router;