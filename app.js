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

// accessing the css and js scripts
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/borrowers/', express.static(path.join(__dirname, '/public')));
app.use('/books/', express.static(path.join(__dirname, '/public')));



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
    bookIDs = []
    rowsToDisplay = []
    books.selectAllBooks()
      .then((books) => {
        books.forEach(function(book) {
          if (!bookIDs.includes(book.id)) {
            bookIDs.push(book.id)
            rowsToDisplay.push(book)
          }
        })
        res.render('books.hbs', {rowsToDisplay})
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
});

app.post('/books', function (req, res){
  // query results may have repeated rows because of many to many relationships
  // between books/authors and books/genres so these arrays are used to
  // make sure a book is only going to display once:
  bookIDs = []
  rowsToDisplay = []
  function display(books) {
    books.forEach(function(book) {
      if (!bookIDs.includes(book.id)) {
        bookIDs.push(book.id)
        rowsToDisplay.push(book)
      }
    })
    res.render('books.hbs', {rowsToDisplay})
  }

  // to display books based on different fields, a different query is run
  // based on what field the user fills in on the search form:
  if (req.body.Title) {
    books.selectBooksByTitle(req.body.Title)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.Author) {
    books.selectBooksByAuthor(req.body.Author)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.AuthorNationality) {
    books.selectBooksByAuthorNationality(req.body.AuthorNationality)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.Language) {
    books.selectBooksByLanguage(req.body.Language)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.Genre) {
    books.selectBooksByGenre(req.body.Genre)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.Publisher) {
    books.selectBooksByPublisher(req.body.Publisher)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.Borrower) {
    books.selectBooksByBorrower(req.body.Borrower)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  } else if (req.body.isBorrowed) {
    books.selectBooksByBorrowedStatus(req.body.isBorrowed)
      .then((books) => {
        display(books)
      }).catch(function(error) {
        console.log("ERROR getting books page: ", error.message)
      })
  }
})

app.get('/books/:id', function (req, res) {
const id = req.params.id;
  books.selectIndividualBook(id)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of multiple authors or genres still works:
      if (!result.length) {
        result = [result]
      }
      // multiple rows will be returned for books with multiple authors
      // and/or genres so repeated information will only be pulled from the
      // first result of the sql query
      singleBook = {
        id: id,
        title: result[0].title,
        authors: [],
        authornationalities: [],
        pgcount: result[0].pgcount,
        lang: result[0].lang,
        genres: [],
        publisher: result[0].publisher,
        checkoutstatus: result[0].checkoutstatus,
        checkoutdate: result[0].checkoutdate,
        borrowerid: result[0].borrowerid,
        borrower: result[0].borrower
      }
      // for books with multiple authors and/or genres, make arrays to hold
      // every value of genre, author and author nationality from each returned result:
      result.forEach(item => {
        singleBook.genres.push(" " + item.genre)
        singleBook.authors.push(" " + item.author)
        singleBook.authornationalities.push(" " + item.nationality)
      })
      // take duplicates out of genre, author, and author nationality arrays:
      singleBook.genres = [...new Set(singleBook.genres)]
      singleBook.authors = [...new Set(singleBook.authors)]
      singleBook.authornationalities = [...new Set(singleBook.authornationalities)]

      res.render('singlebook.hbs', {singleBook})
  }).catch(function(error){
    console.log("ERROR getting individual book GET method: ", error.message)
  })
});

app.post('/books/borroworreturn/:id', function (req, res) {
  const id = req.params.id;
  if(req.body.hasOwnProperty("returnButton")){
    books.returnBook(id).then(() => {
      res.redirect('/books')
    })
  }else if(req.body.hasOwnProperty("borrowButton")) {
   console.log("borrow buton clicked");
   res.redirect(`/books/borrow/${id}`)
  }
})

app.get('/books/borrow/:id', function (req, res) {
  const id = req.params.id;
  // need link to book page
  // need list of borrowers
  // need button to change checkoutstatus to true
  // choose correct borrower ID for book
  // choose correct date for checkout date
  res.render('bookborrow.hbs')
})

app.get('/books/edit/:id', function (req, res) {
const id = req.params.id;

  books.selectIndividualBook(id)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of multiple authors or genres still works:
      if (!result.length) {
        result = [result]
      }

      singleBook = {
        id: id,
        title: result[0].title,
        authors: [],
        authornationalities: [],
        pgcount: result[0].pgcount,
        lang: result[0].lang,
        genres: [],
        publisher: result[0].publisher,
        checkoutstatus: result[0].checkoutstatus,
        checkoutdate: result[0].checkoutdate,
        borrowerid: result[0].borrowerid,
        borrower: result[0].borrower
      }

      result.forEach(item => {
        if (result[0].author == result[0].author) {
          singleBook.authors = result[0].author
          singleBook.authornationalities = result[0].nationality
        } else if (result[0].author != result[1].author) {
          singleBook.authors.push(" " + item.author)
          singleBook.authornationalities.push(" " + item.nationality)
        }

        if (result[0].genre == result[0].genre) {
          singleBook.genres = result[0].genre
        } else if (result[0].genre != result[1].genre) {
          singleBook.genres.push(" " + item.genre)
        }
      })

      res.render('editsinglebook.hbs', {singleBook})
  }).catch(function(error){
    console.log("ERROR getting individual book GET method: ", error.message)
  })
});

app.get('/borrowers', function (req, res){
    borrowers.selectAllBorrowers()
      .then((borrowers) => {
        console.log(borrowers)
        res.render('borrowers.hbs', {borrowers})
      }).catch(function(error) {
        console.log("ERROR getting borrowers page: ", error.message)
      })
});

app.get('/maintain', (req, res) => {
        maintain.selectAllGenres()
    .then((genre) => {
        maintain.selectAllNationalities()
    .then((nationality) => {
        maintain.selectAllLanguages()
    .then((lang) => {
        maintain.selectAllPublishers()
    .then((publisher) =>{
        maintain.selectAllBorrowers()
    .then((borrower) =>{
        maintain.selectAllAuthors()
    .then((author) => {
        maintain.selectAllBooks()
    .then((books) => {

        res.render("maintain.hbs", {
          nationality,
          genre,
          lang,
          publisher,
          borrower,
          author,
          books
        });
    });

    });
    });
    });
    });
    });
    }).catch(function (error) {
        console.log("Eroor in the GET request for the table genres: ", error.message);
    });
});


app.get('/borrowers/:id', function (req, res) {
const id = req.params.id;
  borrowers.selectIndividualBorrower(id)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of borrower having multiple books still works:
      result = result
      singleBorrower = {
        id: id,
        name: result[0].name,
        phone: result[0].phone,
        email: result[0].email,
        titles: []
      }
      if (result[1]) {
        result.forEach(item => {
          // trying to get a link to each borrowed book stuff:
          borrowedBook = { }
          borrowedBook.bookid = item.bookid
          borrowedBook.title = item.title
          singleBorrower.titles.push(borrowedBook)
        })
      } else {
        borrowedBook = { }
        borrowedBook.bookid = result[0].bookid
        borrowedBook.title = result[0].title
        singleBorrower.titles.push(borrowedBook)
      }
      res.render('singleborrower.hbs', {singleBorrower})
  }).catch(function(error){
    console.log("ERROR getting individual borrower: ", error.message)
  })
});

app.get('/borrowers/edit/:id', function (req, res) {
const id = req.params.id;
console.log("req.params: ", id)
  borrowers.selectIndividualBorrower(id)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of borrower having multiple books still works:
      result = result
      singleBorrower = {
        id: id,
        name: result[0].name,
        phone: result[0].phone,
        email: result[0].email,
        titles: []
      }
      if (result[1]) {
        result.forEach(item => {
          singleBorrower.titles.push(" " + item.title)
        })
      } else {
        singleBorrower.titles = result[0].title
      }
      res.render('editsingleborrower.hbs', {singleBorrower})
  }).catch(function(error){
    console.log("ERROR getting individual borrower: ", error.message)
  })
});

app.post('/borrowers/edit/:id', (req, res) => {
  const id = req.params.id;
  const {borrowerName, borrowerPhone, borrowerEmail} = req.body
  splitName = borrowerName.split(" ")
  firstName = splitName[0]
  lastName = splitName[1]
  borrowers.updateBorrower(id, firstName, lastName, borrowerPhone, borrowerEmail)
  .then(() => {
    res.redirect(`/borrowers/${id}`)
  }).catch(function (error) {
    console.log("Error updating borrower ", id)
  })
})

app.get('/borrowers/delete/:id', function (req, res) {

  var identity = parseInt(req.params.id, 10);
  if (Number.isInteger(identity)){
    var identity = identity;
  } else{
    res.redirect('/')
  }
  console.log("req.params: ", req.params)
  borrowers.selectIndividualBorrower(identity)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of borrower having multiple books still works:
      result = result
      console.log("WHat is this?", identity);
      singleBorrower = {
        id: identity,
        name: result[0].name,
        phone: result[0].phone,
        email: result[0].email,
        titles: []
      }

      if (result[1]) {
        result.forEach(item => {
          console.log("what is result[1]",result[1])
          singleBorrower.titles.push(" " + item.title)
        })
      } else {
        singleBorrower.titles = result[0].title
      }
      res.render('deletesingleborrower.hbs', {
        singleBorrower
      })
    }).catch(function (error) {
      console.log("ERROR getting individual borrower: ", error.message)
    })
});


app.post('/borrowers/:id', (req, res)=>{

  const id = req.params.id;
  const {borrowerName, borrowerPhone, borrowerEmail} = req.body;

  console.log("From DELETE form:", id);
  // let msg = window.confirm("are you sure you want to delete");
  // if (msg == true){
  //   alert("You are going to delete!")
  // }
  borrowers.deleteBorrower(id).then((borrower)=>{

    res.redirect('/borrowers')
  }).catch(function(error){
    console.log("Error on the delete request server side:", error.message);
  })
})

app.get('/books/delete/:id', function (req, res) {
   var identity = parseInt(req.params.id, 10);
   if (Number.isInteger(identity)) {
     var identity = identity;
   } else {
     res.redirect('/')
   }
   console.log("req.params: ", req.params)
  books.selectIndividualBook(identity)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of multiple authors or genres still works:
      if (!result.length) {
        result = [result]
      }

      singleBook = {
        id: identity,
        title: result[0].title,
        authors: [],
        authornationalities: [],
        pgcount: result[0].pgcount,
        lang: result[0].lang,
        genres: [],
        publisher: result[0].publisher,
        checkoutstatus: result[0].checkoutstatus,
        checkoutdate: result[0].checkoutdate,
        borrower: result[0].borrower
      }

      result.forEach(item => {
        if (result[0].author == result[0].author) {
          singleBook.authors = result[0].author
          singleBook.authornationalities = result[0].nationality
        } else if (result[0].author != result[1].author) {
          singleBook.authors.push(" " + item.author)
          singleBook.authornationalities.push(" " + item.nationality)
        }

        if (result[0].genre == result[0].genre) {
          singleBook.genres = result[0].genre
        } else if (result[0].genre != result[1].genre) {
          singleBook.genres.push(" " + item.genre)
        }
      })
      res.render('deletesinglebook.hbs', {
        singleBook
      })
    }).catch(function (error) {
      console.log("ERROR getting individual book: ", error.message)
    })
});


app.post('/books/:id', (req, res) => {

  const id = req.params.id;
  // const {
  //   title,
  //   authors,
  //   authornationalities,
  //   pgcount,
  //   lang,
  //   genres,
  //   publisher,
  //   checkoutstatus,
  //   checkoutdate,
  //   borrower,
  // }
  // = req.body;

  console.log("DELETE REQUEST for Book with :", id);
  // let msg = window.confirm("are you sure you want to delete");
  // if (msg == true){
  //   alert("You are going to delete!")
  // }
  books.deleteBook(id).then((result) => {

    res.redirect('/books')
  }).catch(function (error) {
    console.log("Error on the delete request server side:", error.message);
  })
})

app.get('/maintain', function (req, res) {
    maintain.selectAllNationalities()
        .then((nationality) => {

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

        res.redirect('/maintain')
    }).catch(function (error) {
        console.log("Error posting to the borrowers table:", error.message)
    });
});


app.post('/genres', function (req, res) {
    const {genre} = req.body;
    console.log(req.body);
    maintain.postGenre(genre)
    .then((maintain) => {

        res.redirect('/maintain')
    }).catch(function (error) {
        console.log("Error posting to the borrowers table:", error.message)
    });
});


app.post('/languages', function (req, res) {
    maintain.postLanguage(req.body.lang)
    .then((maintain) => {

        res.redirect("/maintain")
    }).catch(function (error){
        console.log("Error posting to the languages table:", error.message)
    });
});


app.post('/publishers', function (req, res) {
    maintain.postPublisher(req.body.publisher)
        .then((maintain) => {

            res.redirect('/maintain')

        }).catch(function(error){
            console.log("Error posting to the publishers table:", error.message)
    });
});

app.post('/nationalities', function (req, res) {
    maintain.postNationality(req.body.nationality)
        .then((maintain) =>{

            res.redirect('/maintain')
        }).catch(function(error) {
            console.log("Error posting the nationality table:", error.message)
    });
});


app.post('/authors', function (req, res) {

    maintain.postAuthors(req.body.lastName, req.body.firstName,req.body.nationText)
        .then((authors) =>{
            res.redirect('/maintain')
        }).catch(function(error) {
            console.log("Error posting the authors table:", error.message)
    });

});


app.post('/booksForm', function (req, res){

    if(req.body.status == 'No'){
      maintain.postBooksNo(req.body.titleBook, req.body.status, req.body.pageCount, req.body.existingPublisher, req.body.existingLanguage)
        .then((books) => {

          res.redirect('/maintain')

        }).catch(function (error) {
          console.log("Error posting the books table:", error.message)
        });
    }else if (req.body.status == 'Yes'){
       maintain.postBooksYes(req.body.titleBook, req.body.status, req.body.existingBorrower,
           req.body.checkoutDate, req.body.pageCount, req.body.existingPublisher, req.body.existingLanguage)
         .then((books) => {

           res.redirect('/maintain')

         }).catch(function (error) {
           console.log("Error posting the books table:", error.message)
         });

    }

});

app.post('/booksAuthorsForm', function (req, res){
  // if there are multiple authors and multiple books selected I will get an array:
    var authors = req.body.existingAuthor;
    var book = req.body.existingBook;


  console.log("The single book add", book);
  maintain.postAuthorsBooks(authors, book).then((authorsbooks) => {


      res.redirect('/maintain')
    }).catch(function (error) {
      console.log("The Authors to the books:", error.message);

    });

});


app.post('/genreBooksForm', function (req, res){

  var genres = req.body.existingGenre;
  var book = req.body.existingBook;

  console.log(genres);
  maintain.postGenreBooks(genres, book).then((genreBooks) => {

    res.redirect('/maintain')
  }).catch(function (error){
    console.log("The Post Form for the genrebooks isn't working:", error.message);
  });
});


app.post('/borrowers', function (req, res) {

  var borrowerName = req.body.borrowerName;

  var lowerCaseBorrowerName = borrowerName.toLowerCase();
  console.log("Does it reach this POST", borrowerName);
  borrowers.selectBorrowerByName(borrowerName).then((borrowers) => {
    console.log(borrowers);


    res.render('borrowers.hbs', {borrowers})
  }).catch(function (error) {
    console.log("The GET request for the searchborrower isn't working on the server", error.message);
  })


})


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
