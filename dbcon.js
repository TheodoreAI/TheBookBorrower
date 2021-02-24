
// This portion was made possible thanks to this wonderful source: 
// 2/21/2021 
// https://reactsensei.com/heroku-deploy-for-mysql-projects/
// Also this medium article: https://medium.com/dev-genius/getting-started-with-heroku-postgres-in-node-53f88c72429d
// 2/22/2021


// code taken from the tutorial
const {Pool} = require('pg');

var URI = process.env.URI;
const pool = new Pool({
    connectionString: URI,
    ssl: {
        rejectUnauthorized: false
    }

});


pool.on('connect', () =>{
    console.log('Connected to the DB');
});


// we can make the tables below:
// I made the borrowers table and inserted into them the data we will use.

pool.query("SELECT * FROM borrowers", (err, res) =>{
    console.log(res.rows[0].firstname);
    pool.end();
});


// this example will let us run queries on the database we made:
// Make sure to run the server locally using: heroku local:run npm start, if you just run npm start
// there will be issues with the SSL for the local machine.




module.exports.pool = pool;
