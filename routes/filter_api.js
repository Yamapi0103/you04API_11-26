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
    .route('/search/:ins/:bas/:keyword')
    .get(function(req,res){
        var ins = req.params.ins,
            bas = req.params.bas,
            keyword =req.params.keyword

            //都有選
            if((ins!=1) && (bas !=1) && (keyword != 1)){             
                connection.query("SELECT * FROM BS_case WHERE industry_name = ? AND BScase_active= ? AND BScase_name LIKE ? ORDER BY BScase_sid DESC",[ins, bas,  "%" + keyword+ "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                })
            }
            ///選兩個
            else if((ins !=1) && (bas !=1) && (keyword == 1)){
                connection.query("SELECT * FROM BS_case WHERE industry_name = ?  AND BScase_active=? ORDER BY BScase_sid DESC",[ins, bas, "%" + keyword + "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("b")
                })
            }
            else if((ins ==1) && (bas !=1) && (keyword != 1)){
                connection.query("SELECT * FROM BS_case WHERE BScase_active=? AND BScase_name LIKE ? ORDER BY BScase_sid DESC",[bas, "%" + keyword + "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("d")
                })
            }
            else if((ins !=1) && (bas ==1) && (keyword != 1)){
                connection.query("SELECT * FROM BS_case WHERE industry_name = ? AND BScase_name LIKE ? ORDER BY BScase_sid DESC",[ins, "%" + keyword + "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("f")
                })
            }
            //選一個
            else if(ins !=1 || bas !=1 || keyword != 1){
                connection.query("SELECT * FROM BS_case WHERE industry_name = ? OR BScase_active=? OR BScase_name LIKE ? ORDER BY BScase_sid DESC",[ins, bas, "%" + keyword + "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("c")
                })
            //都沒選 => 篩選全部
            }else if(ins ==1 && bas ==1 && keyword == 1){
                connection.query("SELECT * FROM BS_case WHERE 1",[ins, bas, "%" + keyword + "%"], function(error,results){
                    if(error) throw error;
                    res.json(results);
                    console.log("c")
                })
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
