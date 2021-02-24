// import the dependencies we will need to add to our app

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3904;
const localhost = "127.0.0.1";
const books = require('./db/books.js');
const borrowers = require('./db/borrowers.js');

var bodyParser = require('body-parser');
// start the express app
var app = express();


var hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs'
});
// set the engine and the file extension name and the files that will be used

app.engine('hbs', hbs.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "hbs");
app.use('/static', express.static('public'));
app.use('/', express.static('public'));



// app.engine('hbs', hbs({
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: [path.join(__dirname + '/views/partials/')],
//     extname: '.hbs',
// }));

// accessing the css
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.render('home', {
        layout: 'main'
    });
});

// getting the files for the navbar
app.get('/books', function (req, res){
    books.selectAllBooks()
      .then((books) => {
        console.log("the books???", books)
        res.render('books.hbs')
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
});

app.get('/borrowers', function (req, res){
    borrowers.selectAllBorrowers()
      .then((borrowers) => {
        console.log("the borrowers???", borrowers)
        res.render('borrowers.hbs')
      }).catch(function(error) {
        console.log("ERROR getting borrowers page: ", error.message)
      })
});


app.get('/maintain', function(req, res){
    res.render('maintain/maintain.hbs')
});


// getting the js files
// app.use('/books', require('./db/books.js'));


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
})

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



app.listen(PORT, () => console.log(`Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`));


module.exports = app;
