var express = require('express');
var router = express.Router();
var mysql = require("mysql");


//建立連線
var connection = mysql.createConnection({
  host: "localhost",
  database: "U04",
  user: "root",
  password: "",
});

// connection.connect();
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//localhost/3000/api/BSAddFavor
router.route("/BSAddFavor")
  .post(function (req, res) {//收藏網紅
    connection.query("insert into bs_favor SET ?", req.body, function (error) {
      if (error) throw error;
      res.json({ message: "已收藏" });
    })
  })
  .get(function (req, res) {//收藏網紅
    connection.query("select * from bs_favor", function (error, rows) {
      if (error) throw error;
      res.json(rows)
      // res.json({message:"get成功"});
    })
  });



router
  .route("/BSAddFavor/:id")
  .get(function (req, res) {
    connection.query("SELECT `IC_sid` FROM `bs_favor` WHERE `BS_sid`=?", req.params.id, function (error, rows) {
      if (error) throw error;
      res.json(rows);
    })
  })

  .delete(function (req, res) {//刪除收藏
    connection.query("DELETE FROM  bs_favor WHERE BF_sid=?", req.params.id, function (error, results) {
      if (error) throw error;
      res.json({ message: "移除成功！" })
    })
  });

//   http://localhost:3000/api/BSGetFavor/1/2
router
  .route("/BSGetFavor/:BSsid/:ICsid")
  .get(function (req, res) {//用BS_sid和IC_sid取得BF_sid 
    connection.query("SELECT `BF_sid` FROM `bs_favor` WHERE `BS_sid`=? AND `IC_sid`=?", [req.params.BSsid, req.params.ICsid], function (error, results) {
      if (error) throw error;
      res.json(results)
    })
  })
  .delete(function (req, res) {//用BS_sid和IC_sid 刪除該筆收藏 
    connection.query("DELETE FROM  bs_favor WHERE BS_sid=? AND IC_sid=? ", [req.params.BSsid,req.params.ICsid], function (error) {
      if (error) throw error;
      res.json({ message: "移除成功！" })
    })
  });


  //   http://localhost:3000/api/BSFavorIC/1
  router
  .route("/BSFavorIC/:BSsid")
  .get(function (req, res) {//用BS_sid 拿到所有收藏的ic members 
    connection.query("SELECT ic.* FROM `icmember` ic JOIN bs_favor bf ON bf.BS_sid=? AND ic.IC_sid = bf.IC_sid ORDER BY ic.IC_sid", [req.params.BSsid], function (error, results) {
      if (error) throw error;
      res.json(results)
    })
  });


module.exports = router;