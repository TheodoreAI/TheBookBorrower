
// This portion was made possible thanks to this wonderful source:
// 2/21/2021
// https://reactsensei.com/heroku-deploy-for-mysql-projects/
// Also this medium article: https://medium.com/dev-genius/getting-started-with-heroku-postgres-in-node-53f88c72429d
// 2/22/2021

var pgp = require('pg-promise')()

const cn = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
