
// code taken from the tutorial
const {Pool} = require('pg');
// const app = require('../app');

var URI = process.env.URI;
const pool = new Pool({
    connectionString: URI,
    ssl: {
        rejectUnauthorized: false
    }

});




module.exports = function () {

    var express = require('express');
    var router = express.Router();

    // code taken from the tutorial
    // const {Pool} = require('pg');

    // var URI = process.env.URI;
    // const pool = new Pool({
    //     connectionString: URI,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }

    // });

    function serveBooks(req, res){
        console.log("You asked me for some books?")
        var query = 'SELECT * FROM users';
        var context = {};
        console.log("This works");
        function handleRenderingOfBooks(error, results, fields){
            console.log(error);
            console.log(results);
            console.log(fields);

            // take the results from the query and store it on the context
            context.books = results;
            // pass it to handlebars to put inside the HTML file
            res.render('books', context)
        }
        
        pool.query(query, handleRenderingOfBooks)
        res.send('Here you go!')
    
    };

    router.get('/', serveBooks);

    return router;

}();
