const mysql=require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    database: "U04",
    user: "root",
    password: "",
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  
  module.exports = {connection};