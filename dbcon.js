
// This portion was made possible thanks to this wonderful source: 
// 2/21/2021 
// https://reactsensei.com/heroku-deploy-for-mysql-projects/


var mysql = require('mysql');
var host = process.env.host;
var username = process.env.username;
var password = process.env.password;
var port = process.env.port;
var database = process.env.database;



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