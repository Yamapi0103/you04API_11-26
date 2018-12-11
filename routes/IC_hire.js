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

// http://localhost:3000/hire/IC_hire
router
  .route("/IC_hire")
  .post(function(req, res) {
    //先檢查有沒有應徵過了
      connection.query(
        "SELECT * FROM `bs_case_detail` WHERE BScase_sid=? AND ICmember_sid=?",
        [req.body.BScase_sid,req.body.ICmember_sid],
        function(error, results) {
          if (error) throw error;
          if(results.length == 1){
            res.json({message:'已應徵'});
          }
          else{
            //之前沒應徵 => 可以應徵
            connection.query(
              "INSERT INTO `bs_case_detail`(`BScase_sid`, `ICmember_sid`) VALUES (?,?)",
              [req.body.BScase_sid,req.body.ICmember_sid],
              function(error) {
                if (error) throw error;

                //抓應徵人數
                connection.query(
                  "SELECT count(*) AS C FROM `bs_case_detail` WHERE BScase_sid=?",
                  req.body.BScase_sid,
                  function(error, NUM) {
                    if (error) throw error;
                    
                      //把應徵人數+1
                      var addhire = NUM[0]['C'];
                      connection.query(
                        "UPDATE `bs_case` SET  `hire_num`=? WHERE `BScase_sid`=?",
                        [addhire,req.body.BScase_sid],
                        function(error) {
                          if (error) throw error;
                         
                        }
                      );
                  }
                );
                res.json({ message: "應徵成功" });
              }
            );
          }
        }
      );
  });
  



/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;