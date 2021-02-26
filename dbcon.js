
// This portion was made possible thanks to this wonderful source:
// 2/21/2021
// https://reactsensei.com/heroku-deploy-for-mysql-projects/
// Also this medium article: https://medium.com/dev-genius/getting-started-with-heroku-postgres-in-node-53f88c72429d
// 2/22/2021


// code taken from the tutorial
// const {Pool} = require('pg');
//
// var URI = process.env.URI;
// const pool = new Pool({
//     connectionString: URI,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

var pgp = require('pg-promise')()

// const cn = {
//     host: process.env.Host,
//     port: process.env.Port,
//     database: process.env.Database,
//     user: process.env.User,
//     password: process.env.Password,
//     max: 20, // use up to 30 connections,
//     ssl: {rejectUnauthorized: false}
//     // "types" - in case you want to set custom type parsers on the pool level
// };


const cn = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  // "types" - in case you want to set custom type parsers on the pool level
};

const db = pgp(cn);

db.connect()
.then(function (obj) {
  console.log("connected to database")
  obj.done()
})
.catch(function (error){
  console.log("ERROR connecting to db: ", error.message);
});

module.exports = db;
