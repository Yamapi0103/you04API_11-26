const mysql=require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    database: "U04",
    user: "root",
<<<<<<< HEAD
    password: "root",
    port:8889
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
=======
    password: "",
    // port:8889
  });

  // connection.connect(function(err) {
  //   if (err) {
  //     console.error("error connecting: " + err.stack);
  //     return;
  //   }
  //   console.log("connected as id " + connection.threadId);
  // });
>>>>>>> caa459985938863cc5e107d5c033b3812e76c3ff

  
  module.exports = {connection};