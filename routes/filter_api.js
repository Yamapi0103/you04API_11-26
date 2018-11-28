var express = require('express');
var router = express.Router();
var mysql = require("mysql");


//建立連線
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'U04'
//   port:8889
});

// connection.connect();
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

router
    .route('/searchIndustry')
    .get(function(req, res){
        connection.query("SELECT * FROM industry_categories",function(error, results){
            if(error) throw error;
            res.json(results);
        })
    })

    router
    .route('/searchActive')
    .get(function(req, res){
        connection.query("SELECT * FROM active_categories",function(error, results){
            if(error) throw error;
            res.json(results);
        })
    })

    router
    .route('/search/:ins/:bas')
    .get(function(req,res){
        var ins = req.params.ins,
            bas = req.params.bas;

            if((ins!=1) && (bas !=1)){             
                connection.query("SELECT * FROM BS_case WHERE industry_name = ? AND BScase_active=?",[ins, bas], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log(ins,bas)
                })
            }
            else if(ins !=1 || bas !=1){
                connection.query("SELECT * FROM BS_case WHERE industry_name = ? OR BScase_active=?",[ins, bas], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("b")
                })
            }
            else{
                alert('請至少選擇一個項目')
            }

    })
    router
    .route('/order')
    .get(function(req, res){
        connection.query("SELECT BScase_sid FROM BS_case ORDER BY BScase_sid", function(error, results){
            if(error) throw error;
            res.json(results)
        })
    })

    router
    .route('/order/reverse')
    .get(function(req, res){
        connection.query("SELECT BScase_sid FROM BS_case ORDER BY BScase_sid DESC", function(error, results){
            if(error) throw error;
            res.json(results)
        })
    })



    router
    .route('/pairIndustry/:id')
    .get(function(req,res){
        connection.query("SELECT * FROM `industry_categories` WHERE `id`=?", req.params.id, function(error, results){
            if(error) throw error;
            res.json(results);
        })
    })

    
    router
    .route('/pairActive/:id')
    .get(function(req,res){
        connection.query("SELECT * FROM `active_categories` WHERE `id`=?", req.params.id, function(error, results){
            if(error) throw error;
            res.json(results);
        })
    })

module.exports = router;
