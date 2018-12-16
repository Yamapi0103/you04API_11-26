var express = require('express');
var router = express.Router();
var {connection} =require('./connect_db')
var multer  = require('multer');
var upload = multer({ dest: 'public/images/uploads/' });
var {connection} =require('./connect_db');


connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});




// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'public/uploads/bs_case_photo')
//   },
//   filename: function (req, file, cb) {
//       var changedName = (new Date().getTime())+'-'+file.originalname;
//       cb(null, changedName)
//       console.log(cb)
//   }
// })

// var upload = multer({ storage: storage })

// router
// .post('/upload/', upload.single('image'), function (req, res) {
//     res.send(req.file);
// })

var uploadFolder = '/build/uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    
    },
    filename: function (req, file, cb) {
      var changedName = (new Date().getTime())+'-'+file.originalname;
      cb(null, changedName)
      console.log(cb)
    }
});
var upload = multer({ storage: storage })

  
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {

      var changedName = file.originalname;
      cb(null, changedName)
      console.log(cb)
  }
})

var upload = multer({ storage: storage })

//上傳圖片
router
.post('/upload', upload.single('image'), function (req, res, next) {
  res.send(req.file);
  console.log(req.file.fielname)
})


//localhost/3000/api/publish
router.route("/publish")
  .get(function(req, res) {//讀所有資料
    connection.query("SELECT * FROM BS_case",function(error, results){
        if(error) throw error;
        res.json(results);
    })
  }) 
  .post(function(req, res) {//新增資料
    connection.query("INSERT INTO BS_case SET ?", req.body, function(error){
        if(error) throw error;
        res.json({message:"新增成功"});
    })
  }); 
//拿到最後一筆資料
router.route("/publishlastOne")
  .get(function(req, res) {//讀所有資料
    connection.query("SELECT * FROM `bs_case` ORDER BY BScase_sid DESC LIMIT 1",function(error, results){
        if(error) throw error;
        res.json(results);
    })
  })

//localhost/3000/api/publish/:id
router
  .route("/publish/:id")
  .get(function(req, res) {
    connection.query("SELECT * FROM Bs_case WHERE BScase_sid=?", req.params.id, function(error, results){
        if(error) throw error;
        res.json(results)
    })
  }) 
  .put(function(req, res) {//修改資料
    connection.query("UPDATE BS_case SET ? WHERE BScase_sid=?",[req.body, req.params.id], function(error, results){
        if(error) throw error;
        res.json({message:"修改成功"});
    })
  }) 
  .delete(function(req, res) {//刪除資料
    connection.query("DELETE FROM BS_case WHERE BScase_sid=?", req.params.id,function(error,results){
        if(error) throw error;
        res.json({message:"刪除成功！"})
    })
  }); 


module.exports = router;
