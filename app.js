const express = require('express');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 8080;
const localhost = "127.0.0.1";
const books = require('./db/books.js');
const borrowers = require('./db/borrowers.js');
const maintain = require('./db/maintain.js');


var bodyParser = require('body-parser');
var app = express();


var hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs'
});

// set the engine and the file extension name and the files that will be used
app.engine('hbs', hbs.engine);
// setting the middleware
app.set("view engine", "hbs");
app.use('/static', express.static('public'));
app.use('/', express.static('public'));

// accessing the css and js scripts
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/borrowers/', express.static(path.join(__dirname, '/public')));
app.use('/books/', express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.render('home', {
        layout: 'main'
    });
});

// displaying a page of all the books:
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

// filtering the list of books displayed:
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

// display a page of full information for a single book:
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

// borrow or return a book
// return just happens on the back end
// borrow requires a page to select the borrower
app.post('/books/borroworreturn/:id', function (req, res) {
  const id = req.params.id;
  if(req.body.hasOwnProperty("returnButton")){
    books.returnBook(id).then(() => {
      res.redirect(`/books/${id}`)
    })
  }else if(req.body.hasOwnProperty("borrowButton")) {
   res.redirect(`/books/borrow/${id}`)
  }
})

app.get('/books/borrow/:id', function (req, res) {
  const id = req.params.id;
  books.borrowBookById(id)
  .then((resultbook) =>{

    borrowers.selectAllBorrowers()
    .then((borrowers) => {
      const bookToBorrow = resultbook[0];

      borrowIDs = []
      rowsToDisplay = []

      borrowers.forEach(function (borrow) {
        if (!borrowIDs.includes(borrow.id)) {
          borrowIDs.push(borrow.id)
          rowsToDisplay.push(borrow)
        }
      })

      res.render('bookborrow.hbs', {bookToBorrow, rowsToDisplay})
    })
  }).catch( function(error) {
    console.log("Error on the server while making the bookBorrow.hbs request: ", error.message);
  })

})

app.post('/books/borrowing/:id', function (req, res){
  const bookId = req.params.id
  const borrower = req.body.existingBorrower;
  const bookTitle = req.body.bookBorrowing;
  const bookCheckoutdate = req.body.bookCheckoutdate;

  books.bookBorrowingUpdate(borrower, bookTitle, bookCheckoutdate)
    .then((resultbook) => {
      res.redirect(`/books/${bookId}`)
  }).catch(function(error){
    console.log("Error in the POST request to update the book that is borrowed:", error.message);
  })
})

// a page to edit information for individual books
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

      // getting the individual book information for editable text boxes:
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
        singleBook.genres.push(" " + item.genre)
        singleBook.authors.push(" " + item.author)
        singleBook.authornationalities.push(" " + item.nationality)
      })
      // take duplicates out of genre, author, and author nationality arrays:
      singleBook.genres = [...new Set(singleBook.genres)]
      singleBook.authors = [...new Set(singleBook.authors)]
      singleBook.authornationalities = [...new Set(singleBook.authornationalities)]

      // get lists of all authors, nationalities, languages, genres, publishers:
      //  so existing values from tables can be chosen for updates:
      maintain.selectAllAuthors().then((result) => {
        allAuthors = []
        result.forEach(name => {
          allAuthors.push(name.fullName)
        })


        maintain.selectAllNationalities().then((result) => {
          allNationalities = []
          result.forEach(nationalityObject => {
            allNationalities.push(nationalityObject.nationality)
          })


          maintain.selectAllLanguages().then((result) => {
            allLanguages = []
            result.forEach(languageObject => {
              allLanguages.push(languageObject.lang)
            })


            maintain.selectAllGenres().then((result) => {
              allGenres = []
              result.forEach(genreObject => {
                allGenres.push(genreObject.genre)
              })



              maintain.selectAllPublishers().then((result) => {
                allPublishers = []
                result.forEach(publisherObject => {
                  allPublishers.push(publisherObject.publisher)
                })
                // pulling the existing authors and genres for the individual
                // book so the book's fields can be updated on the edit page:
                thisBooksAuthors = singleBook.authors
                thisBooksGenres = singleBook.genres
                res.render('editsinglebook.hbs', {
                  singleBook, thisBooksAuthors, thisBooksGenres, allAuthors, allNationalities, allLanguages, allGenres, allPublishers
                })
              })
            })
          })
        })
      })
}).catch(function(error){
  console.log("ERROR getting individual book GET method: ", error.message)
        })
});


// update individual book title:
app.post('/books/edit/title/:id', function (req, res) {
const id = req.params.id;
const title = req.body.bookTitle
  books.updateBookTitle(id, title)
    .then(() => {
      res.redirect(`/books/edit/${id}`)
  }).catch(function(error){
    console.log("ERROR updating book ", id)
  })
});

// adding additional authors on individual book page:
app.post('/books/edit/addauthors/:id', function (req, res) {
const id = req.params.id;
const authors = req.body.newAuthors;
books.selectIndividualBook(id).then((book) => {
  maintain.postAuthorsBooks(authors, book[0].title)
  .then(() => {
      res.redirect(`/books/edit/${id}`)
  }).catch(function(error){
    console.log("ERROR updating book ", id)
  })
})
});

// deleting authors on individual book page:
app.post('/books/edit/deleteauthors/:id', function (req, res) {
const id = req.params.id;
const authors = req.body.existingAuthors;

console.log(id, authors);
books.deleteAuthorsFromSingleBook(id, authors).then((resultFromDelete) => {

  res.redirect(`/books/edit/${id}`);

}).catch(function(error){
  console.log("Error in the server while making the deleteauthors request:", error.message);
})
});

// update individual book page count:
app.post('/books/edit/pagecount/:id', function (req, res) {
const id = req.params.id;
const pgCount = req.body.bookPages
  books.updatePageCount(id, pgCount)
    .then(() => {
      res.redirect(`/books/edit/${id}`)
  }).catch(function(error){
    console.log("ERROR updating book ", id)
  })
});

// update individual book language:
app.post('/books/edit/language/:id', function (req, res) {
const id = req.params.id;
const language = req.body.newLanguage
  books.updateBookLanguage(id, language)
    .then(() => {
      res.redirect(`/books/edit/${id}`)
    }).catch(function(error) {
      console.log("ERROR at language update route for book ", id)
    })
});

// adding additional genres on individual book page:
app.post('/books/edit/addgenres/:id', function (req, res) {
const id = req.params.id;
const genres = req.body.newGenres;
books.selectIndividualBook(id).then((book) => {
  maintain.postGenreBooks(genres, book[0].title)
  .then(() => {
      res.redirect(`/books/edit/${id}`)
  }).catch(function(error){
    console.log("ERROR updating book ", id)
  })
})
});

// deleting genres on individual book page:
app.post('/books/edit/deletegenres/:id', function (req, res) {
const id = req.params.id;
const genres = req.body.existingGenres;
books.deleteGenresFromSingleBook(id, genres).then((resultFromDelete) => {
  res.redirect(`/books/edit/${id}`)
}).catch(function(error){

    console.log("Error in the server to make the deletegenres", error.message);
})
});

// update individual book publisher:
app.post('/books/edit/publisher/:id', function (req, res) {
const id = req.params.id;
const publisher = req.body.newPublisher
  books.updateBookPublisher(id, publisher)
    .then(() => {
      res.redirect(`/books/edit/${id}`)
    }).catch(function(error) {
      console.log("ERROR at publisher update route for book ", id)
    })
});

// display list of borrowers:
app.get('/borrowers', function (req, res){

    borrowers.selectAllBorrowers()
      .then((borrowers) => {
        borrowIDs = []
        rowsToDisplay = []
        borrowers.forEach(function (borrow) {
        if (!borrowIDs.includes(borrow.id)) {
            borrowIDs.push(borrow.id)
            rowsToDisplay.push(borrow)
        }
      })

        res.render('borrowers.hbs', {rowsToDisplay})
      }).catch(function(error) {
        console.log("ERROR getting borrowers page: ", error.message)
      })
});

// display page where users can add entities to the database
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

// display an individual borrower's information
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

// go to the page to edit an individual borrower's information:
app.get('/borrowers/edit/:id', function (req, res) {
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

// update individual borrower's information based on user's choices:
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

// page to confirm deleting borrowers:
app.get('/borrowers/delete/:id', function (req, res) {

  var identity = parseInt(req.params.id, 10);
  if (Number.isInteger(identity)){
    var identity = identity;
  } else{
    res.redirect('/')
  }

  borrowers.selectIndividualBorrower(identity)
    .then((result) => {
      //change result into an array if there is only one result
      // so code that is written to handle
      // possibility of borrower having multiple books still works:
      result = result
      singleBorrower = {
        id: identity,
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
      res.render('deletesingleborrower.hbs', {
        singleBorrower
      })
    }).catch(function (error) {
      console.log("ERROR getting individual borrower: ", error.message)
    })
});

// delete a borrower
app.post('/borrowers/:id', (req, res)=>{

  const id = req.params.id;
  const {borrowerName, borrowerPhone, borrowerEmail} = req.body;
  borrowers.deleteBorrower(id).then((borrower)=>{

    res.redirect('/borrowers')
  }).catch(function(error){
    console.log("Error on the delete request server side:", error.message);
  })
})

// page to confirm deleting a book
app.get('/books/delete/:id', function (req, res) {
   var identity = parseInt(req.params.id, 10);
   if (Number.isInteger(identity)) {
     var identity = identity;
   } else {
     res.redirect('/')
   }
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


// deleting a book
app.post('/books/:id', (req, res) => {

  const id = req.params.id;
  books.deleteBook(id).then((result) => {

    res.redirect('/books')
  }).catch(function (error) {
    console.log("Error on the delete request server side:", error.message);
  })
})

// inserting a borrower into the database on the maintain page
app.post('/borrowerForm', function (req, res) {
    maintain.postBorrower(req.body.borrowerFirst, req.body.borrowerLast, req.body.email, req.body.phone)
    .then((maintain) => {

        res.redirect('/maintain')
    }).catch(function (error) {
        console.log("Error posting to the borrowers table:", error.message)
    });
});

// inserting a genre into the database on the maintain page
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

// inserting a language into the database on the maintain page
app.post('/languages', function (req, res) {
    maintain.postLanguage(req.body.lang)
    .then((maintain) => {

        res.redirect("/maintain")
    }).catch(function (error){
        console.log("Error posting to the languages table:", error.message)
    });
});

// inserting a publisher into the database on the maintain page
app.post('/publishers', function (req, res) {
    maintain.postPublisher(req.body.publisher)
        .then((maintain) => {

            res.redirect('/maintain')

        }).catch(function(error){
            console.log("Error posting to the publishers table:", error.message)
    });
});

// inserting an author nationality into the database on the maintain page
app.post('/nationalities', function (req, res) {
    maintain.postNationality(req.body.nationality)
        .then((maintain) =>{

            res.redirect('/maintain')
        }).catch(function(error) {
            console.log("Error posting the nationality table:", error.message)
    });
});

// inserting an author into the database on the maintain page
app.post('/authors', function (req, res) {

    maintain.postAuthors(req.body.lastName, req.body.firstName,req.body.nationText)
        .then((authors) =>{
            res.redirect('/maintain')
        }).catch(function(error) {
            console.log("Error posting the authors table:", error.message)
    });

});

// inserting book into the database on the maintain page
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

// inserting book into the authorsbooks table on the maintain page
app.post('/booksAuthorsForm', function (req, res){
  // if there are multiple authors and multiple books selected I will get an array:
    var authors = req.body.existingAuthor;
    var book = req.body.existingBook;

  maintain.postAuthorsBooks(authors, book).then((authorsbooks) => {
      res.redirect('/maintain')
    }).catch(function (error) {
      console.log("The Authors to the books:", error.message);

    });

});

// inserting book into the genrebooks table on the maintain page
app.post('/genreBooksForm', function (req, res){

  var genres = req.body.existingGenre;
  var book = req.body.existingBook;


  maintain.postGenreBooks(genres, book).then((genreBooks) => {

    res.redirect('/maintain')
  }).catch(function (error){
    console.log("The Post Form for the genrebooks isn't working:", error.message);
  });
});

// inserting into the borrowers table on the maintain page
app.post('/borrowers', function (req, res) {
  var borrowerName = req.body.borrowerName;
  var lowerCaseBorrowerName = borrowerName.toLowerCase();
  borrowers.selectBorrowerByName(borrowerName).then((rowsToDisplay) => {

    res.render('borrowers.hbs', {rowsToDisplay})
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
