var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    database: "U04",
    user: "root",
    password: "",
  });

connection.connect();


// http://localhost:3000/api/icmembers
router.route('/icmembers')
    .post(function (req, res) {
        connection.query("SELECT `IC_email` FROM `icmember` WHERE `IC_email`=?",req.body.email, function (error,results) { 
            if (error) throw error;
            if(results.length == 1){
                res.json({message:"email重複!",stay:true});
            }
            else{
                connection.query("INSERT INTO `icmember`(`IC_email`, `IC_password`, `IC_create_at`) VALUES (?,?,?)",[req.body.email,req.body.password,req.body.now], function (error) { 
                    if (error) throw error;
                    res.json({message:"新增成功!!!",stay:false}); 
                })
            }
        })
    })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;