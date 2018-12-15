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

//網紅抓取他所有應徵的案子中,共有幾個未讀訊息
// http://localhost:3000/sse/ICnavbar/1
router.route("/ICnavbar/:sid").get(function(req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Credentials', true);
  res.writeHead(200, {
    //用writeHead改寫Response-headers中的項目  第一個參數可以給200(status code的意思代表server正常)
    "Content-Type": "text/event-stream", //一定要打!!!
    "Connection": "keep-alive", //可以不打
    "Cache-Control": "no-cache" //broswer會內建cache功能,會自動記住某些css js檔方便下次執行更快,但可能會造成檔案更新後在網頁看不到新結果
  });
  setInterval(function() {
    connection.query(
      "SELECT COUNT(*) AS count FROM `bs_talk` o JOIN `bs_case_detail` p ON o.`talk_sid`= p.sid WHERE o.`bs_talk_state`=0 AND p.ICmember_sid=?",
      req.params.sid,
      function(error, results) {
        if (error) throw error;
        //sse時好像不能這樣寫: res.json(results);   //回傳[{'count':3}]
        res.write("data:" + JSON.stringify(results) + "\n\n");
      }
    );
  }, 2000);
});


//廠商抓取所有發布中案子的所有應徵網紅,共有幾個未讀訊息
// http://localhost:3000/sse/BSnavbar
router.route("/BSnavbar/:sid").get(function(req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', true);
    res.writeHead(200, {
      //用writeHead改寫Response-headers中的項目  第一個參數可以給200(status code的意思代表server正常)
      "Content-Type": "text/event-stream", //一定要打!!!
      "Connection": "keep-alive", //可以不打
      "Cache-Control": "no-cache" //broswer會內建cache功能,會自動記住某些css js檔方便下次執行更快,但可能會造成檔案更新後在網頁看不到新結果
    });
    setInterval(function() {
      connection.query(
        "SELECT COUNT(*) AS count  FROM `ic_talk` o JOIN `bs_case_detail` p ON o.`talk_sid`= p.sid JOIN `bs_case` z ON p.`BScase_sid`= z.`BScase_sid` WHERE o.`ic_talk_state`=0 AND z.BS_sid=?",
        req.params.sid,
        function(error, results) {
          if (error) throw error;
          //sse時好像不能這樣寫: res.json(results);   //回傳[{'count':3}]
          res.write("data:" + JSON.stringify(results) + "\n\n");
        }
      );
    }, 2000);
  });


/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
