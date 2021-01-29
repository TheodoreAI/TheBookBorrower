// import the dependencies we will need to add to our app

const express = require('express');
const path = require('path');
const db = require('./config/config');
const PORT = process.env.PORT || 3964;
const localhost = "127.0.0.1";




const hbs = require('express-handlebars');
// start the express app
const app = express();



// set the engine and the file extension name and the files that will be used
app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [path.join(__dirname + '/views/partials/')],
    extname: '.hbs',
}));


app.set("view engine", "hbs");


// accessing the css
app.use('/', express.static(path.join(__dirname, '/public')));


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something Broke!');
})



app.get('/', function(req, res){

    res.render('home', {layout: 'main'});
});

app.get('/borrowers', function(req, res){
    res.render('borrowers.hbs')
});


app.get('/genres', function(req, res){
    res.render('./genres/genres')
});

app.get('/authors', function (req, res) {
    res.render('./authors/authors')
});


app.get('/maintain', function(req, res){
    res.render('./maintain/maintain')
});

app.listen(PORT, () => console.log(`Web App running at http://${localhost}:${PORT}/`));


module.exports = app;