// import the dependencies we will need to add to our app

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3904;
const localhost = "127.0.0.1";
const books = require('./db/books.js');
const borrowers = require('./db/borrowers.js');
const maintain = require('./db/maintain.js');


var bodyParser = require('body-parser');

// start the express app
var app = express();


var hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs'
});
// set the engine and the file extension name and the files that will be used

app.engine('hbs', hbs.engine);

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


app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', function (req, res) {
    res.render('home', {
        layout: 'main'
    });
});



// getting the files for the navbar
app.get('/books', function (req, res){
    books.selectAllBooks()
      .then((books) => {
        res.render('books.hbs', {books})
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
});

app.get('/borrowers', function (req, res){
    borrowers.selectAllBorrowers()
      .then((borrowers) => {
        res.render('borrowers.hbs', {borrowers})
      }).catch(function(error) {
        console.log("ERROR getting borrowers page: ", error.message)
      })
});


app.get('/maintain', function (req, res) {
    maintain.selectAllNationalities()
        .then((nationality) => {
                console.log(req.body, "this is the nations");
                const context = {};
                for (let i = 0; i < nationality.length; i++) {
                        context['key' + i] = nationality[i];
                }
                
                res.render("maintain.hbs", {context})
        }).catch(function (error) {
                console.log("Error in the GET request for the table authors: ", error.message);
        });

});

app.post('/borrowerForm', function (req, res) {
    maintain.postBorrower(req.body.borrowerFirst, req.body.borrowerLast, req.body.email, req.body.phone)
    .then((maintain) => {
        console.log(req.body);
        res.render('maintain')
    }).catch(function (error) {
        console.log("Error posting to the borrowers table:", error.message)
    });
});


app.post('/genres', function (req, res) {
    const {genre} = req.body;
    console.log(req.body);
    maintain.postGenre(genre)
    .then((maintain) => {
        console.log("The genres?", maintain);
        res.render('maintain.hbs')
    }).catch(function (error) {
        console.log("Error posting to the borrowers table:", error.message)
    });
});


app.post('/languages', function (req, res) {
    maintain.postLanguage(req.body.lang)
    .then((maintain) => {
        console.log('The lanuage', maintain);
        res.render("maintain.hbs")
    }).catch(function (error){
        console.log("Error posting to the languages table:", error.message)
    });
});


app.post('/publishers', function (req, res) {
    maintain.postPublisher(req.body.publisher)
        .then((maintain) => {
            console.log("The publisher is:", maintain);
            res.render('maintain.hbs')

        }).catch(function(error){
            console.log("Error posting to the publishers table:", error.message)
    });
});

app.post('/nationalities', function (req, res) {
    maintain.postNationality(req.body.nationality)
        .then((maintain) =>{
            console.log("The nationality is:", maintain);
            res.render('maintain.hbs')
        }).catch(function(error) {
            console.log("Error posting the nationality table:", error.message)
    });
});


app.post('/authors', function (req, res) {
    console.log("what is happening?", req.body.lastName);
    maintain.postAuthors(req.body.lastName, req.body.firstName,req.body.nationText)
        .then((authors) =>{
            res.render('maintain.hbs')
        }).catch(function(error) {
            console.log("Error posting the authors table:", error.message)
    });

});

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
