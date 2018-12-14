var express = require("express");
var router = express.Router();
<<<<<<< HEAD
var {connection} =require('./connect_db')
=======

>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff
var multer  = require('multer');
var upload = multer({ dest: 'public/images/uploads/member_photo' });
var {connection} =require('./connect_db');

<<<<<<< HEAD
connection.connect(function(err) {
=======

connection.connect(function (err) {
>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

router.route("/icmembers")
.get(function(req, res) {
  connection.query(
    "select * FROM `icmember`",
    function(error, results) {
      if (error) throw error;
      res.json(results); //回傳[{}]
    }
  );
})



//廠商個資
// http://localhost:3000/info/bsmemberinfo/1
router.route("/bsmemberinfo/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `bsmember` WHERE BS_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查無此帳號'});  //回傳{}
      }
      else{
        res.json(results); //回傳[{}]
      }
    }
  );
})

//網紅個資
// http://localhost:3000/info/icmembers/1
router.route("/icmembers/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT * FROM `icmember` WHERE IC_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查無此帳號'});  //回傳{}
      }
      else{
        res.json(results); //回傳[{}]
      }
    }
  );
})
.put(function(req, res) {
  connection.query(
    "UPDATE `icmember` SET ? WHERE `IC_sid`=?",
    // "UPDATE `icmember` SET `IC_email`=?,`IC_password`=?,`IC_name`=?,`IC_create_at`=? WHERE IC_sid=?",
    [
        req.body,
        req.params.sid
    ],
    function(error, results) {
      if (error) throw error;
      res.json({message:'修改成功'}); 
    }
  );
});

//---------------------upload photo-------------------------//

var uploadFolder = 'public/uploads/member_photo';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    
    },
    filename: function (req, file, cb) {
      var changedName = (new Date().getTime())+'-IC'+file.originalname;
      cb(null, changedName)
      
    }
});
var upload = multer({ storage: storage })

//upload file and also update new name to DB
router
.route("/icmembers_upload_Photo/:sid")
.put(upload.single('photo'), function(req, res) {
  connection.query(
    "UPDATE `icmember` SET IC_photo=? WHERE `IC_sid`=?",[req.file.filename,req.params.sid],function(error, results) {
      if (error) throw error;
      res.json({message:'照片上傳成功'}); 
    }
  );
});

//---------------------end of upload photo-------------------------//

//---------------------upload bs photo-------------------------//
var uploadFolder = 'public/uploads/member_photo';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    
    },
    filename: function (req, file, cb) {
      var changedName = (new Date().getTime())+'-BS'+file.originalname;
      cb(null, changedName)
      //console.log(cb)
    }
});
var upload = multer({ storage: storage })

//upload file and also update new name to DB
router
.route("/bsmembers_upload_Photo/:sid")
.put(upload.single('photo'), function(req, res) {
  connection.query(
    "UPDATE `bsmember` SET BS_photo=? WHERE `BS_sid`=?",[req.file.filename,req.params.sid],function(error, results) {
      if (error) throw error;
      res.json({message:'照片上傳成功'}); 
    }
  );
});
//---------------------end of upload photo-------------------------//


//廠商個資
// http://localhost:3000/info/bsmembers/1
router.route("/bsmembers/:sid")
.get(function(req, res) {
  connection.query(
    "SELECT `BS_email`, `BS_password`, `BS_name`, `BS_type`, `BS_phone`, `BS_link`, `BS_info` FROM `bsmember` WHERE BS_sid=?",
    req.params.sid,
    function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查無此帳號'});
      }
      else{
        res.json(results); //{}
      }
    }
  );
})
.put(function(req, res) {
  connection.query(
    "UPDATE `bsmember` SET `BS_email`=?,`BS_password`=?,`BS_name`=?,`BS_type`=?,`BS_phone`=?,`BS_link`=?,`BS_info`=?,`BS_create_at`=? WHERE BS_sid=?",
    [
        req.body.BS_email,
        req.body.BS_password,
        req.body.BS_name
        ,req.body.BS_type
        ,req.body.BS_phone
        ,req.body.BS_link
        ,req.body.BS_info
        ,req.body.BS_create_at
        ,req.params.sid
    ],
    function(error, results) {
      if (error) throw error;
      res.json({message:'修改成功'}); 
    }
  );
});



//查詢各類網紅
//eg: http://localhost:3000/info/icmedia/youtube
router.route("/icmedia/:media")
  .get(function(req, res) {
    let ic_media = req.params.media;
    if(ic_media=="all"){
      connection.query(
        "SELECT * FROM `icmember`",function(error, results) {
          if (error) throw error;
          if(results.length ==0){
            res.json({Message:'找不到任何網紅'});  //回傳{}
          }
          else{}
            res.json(results); //回傳[{}]
          }
      );
    }  
  else{
    connection.query(
    "SELECT * FROM `icmember` WHERE IC_media=?",ic_media,function(error, results) {
      if (error) throw error;
      if(results.length ==0){
        res.json({Message:'查不到該類網紅'});  //回傳{}
      }
      else{}
        res.json(results); //回傳[{}]
      }
  );
}
});





/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
