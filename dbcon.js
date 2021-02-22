var mysql = require('mysql');
var host = process.env.host;
var username = process.env.username;
var password = process.env.password;
var port = process.env.port;
var database = process.env.database;


var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();


if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}else {
    var connection = mysql.createConnection({

        host: host,
        port: port,
        username: username,
        password: password,
        database: database
    });
}


// making the connecton

connection.connect(function(err){
    if(err){
        console.error("error connecting: " +err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


// we will use this to make the queries from the other js pages.
module.exports = connection;