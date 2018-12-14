var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var {connection} =require('./connect_db')

=======
var {connection} =require('./connect_db');
>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff


connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


router
  .route("/BSMyFavor")
  .get(function (req, res) {
    connection.query("SELECT `IC_sid` FROM `bs_favor` WHERE `BS_sid`=1", function (error, rows) {
      if (error) throw error;
      res.json(rows);
    })
  })


module.exports = router;
