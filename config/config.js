const mysql = require('mysql');



// with this I will make my own database connection to run SQL queries from a .sql file
// multipleStatements allows me to run multiple SQL statements at a time. 



// For when I run it on the OSU server

// const db = mysql.createConnection({
//     host: 'classmysql.engr.oregonstate.edu',
//     user: 'cs340_estradma',
//     password: '8792',
//     database: 'cs340_estradma',
//     multipleStatements: true
// });

// Local server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Library',
    multipleStatements: true
});

module.exports = db;

//  This code was taken from the How to Run Multiple SQL 
//  queries Directly from an SQL File in NODEJS.

