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
          res.json({
            message: '已收藏'
          });
          console.log("a")
        } else {
          //之前沒收藏 => 可以收藏
          connection.query(
            "INSERT INTO `ic_favor`(`BScase_sid`, `ICmember_sid`) VALUES (?,?)",
            [req.body.BScase_sid, req.body.ICmember_sid],
            function (error) {
              if (error) throw error;
              res.json({
                message: "收藏成功"
              });
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
  //顯示該IC收藏的廠商案子
    connection.query(
      "SELECT * FROM `ic_favor`o JOIN `bs_case` p ON o.BScase_sid =p.BScase_sid  WHERE o.ICmember_sid=? AND p.BS_state=1", //IC_sid為廠商的id
      req.params.sid,
      function (error, results) {
        if (error) throw error;
        res.json(results); //回傳 [{},{}....]
      }
    );
  })





//   http://localhost:3000/api/ICGetFavor/1/2
router
  .route("/ICGetFavor/:ICsid/:BScsaseid")
  .get(function (req, res) { //用ICmember_sid和BScase_sid取得sid 
    connection.query("SELECT `sid` FROM `ic_favor` WHERE `ICmember_sid`=? AND `BScase_sid`=?", [req.params.ICsid, req.params.BScsaseid], function (error, results) {
      if (error) throw error;
      res.json(results)
    })
  })
  .delete(function (req, res) { //用ICmember_sid和BScase_sid 刪除該筆收藏 
    connection.query("DELETE FROM  ic_favor WHERE ICmember_sid=? AND BScase_sid=? ", [req.params.ICsid, req.params.BScsaseid], function (error) {
      if (error) throw error;
      res.json({
        message: "移除成功！"
      })
    })
  });


//   http://localhost:3000/api/ICFavorBSC/1
router
  .route("/ICFavorBSC/:ICsid")
  .get(function (req, res) { //用ICmember_sid 拿到所有收藏的BS BScase 
    connection.query("SELECT BS.* FROM `icmember` BS JOIN bs_favor icf ON icf.ICmember_sid=? AND BS.BScase_sid = icf.BScase_sid ORDER BY BS.BScase_sid", [req.params.ICsid], function (error, results) {
      if (error) throw error;
      res.json(results)
    })
  });


module.exports = router;