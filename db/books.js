const db = require('../dbcon.js')


const selectAllBooks = () => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    INNER JOIN nationalities
       ON authors.nationID = nationalities.id
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    `).then((books) => {
     
      return books
    }).catch(function (error) {
      console.log("ERROR selecting all books: ", error.message)
    })
}

const selectBooksByTitle = (title) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(books.title) LIKE lower($1)
    `, ['%' + title + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by title: ", error.message)
    })
}

const selectBooksByAuthor = (author) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(CONCAT(authors.firstName, ' ', authors.lastName)) LIKE lower($1)
    `, ['%' + author + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by author: ", error.message)
    })
}

const selectBooksByAuthorNationality = (authorNationality) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    INNER JOIN nationalities
       ON authors.nationID = nationalities.id
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(nationalities.nationality) LIKE lower($1)
    `, ['%' + authorNationality + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by author's nationality: ", error.message)
    })
}

const selectBooksByLanguage = (language) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    LEFT JOIN languages
       ON languages.id = books.languageID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(languages.lang) LIKE lower($1)
    `, ['%' + language + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by language: ", error.message)
    })
}

const selectBooksByGenre = (genre) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    INNER JOIN genrebooks
       ON books.id = genrebooks.bookID
    LEFT JOIN genres
       ON genres.id = genrebooks.genreID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(genres.genre) LIKE lower($1)
    `, ['%' + genre + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by genre: ", error.message)
    })
}

const selectBooksByPublisher = (publisher) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    INNER JOIN publishers
       ON books.publisherID = publishers.id
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(publishers.publisher) LIKE lower($1)
    `, ['%' + publisher + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by publisher: ", error.message)
    })
}

const selectBooksByBorrowedStatus = (borrowedStatus) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      books.checkoutStatus = $1
    `, [borrowedStatus]).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by borrower: ", error.message)
    })
}

const selectBooksByBorrower = (borrower) => {
  return db.query(`
    SELECT
      books.id, books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM
       books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE
      lower(CONCAT(borrowers.firstName, ' ', borrowers.lastName)) LIKE lower($1)
    `, ['%' + borrower + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by borrower: ", error.message)
    })
}

const selectIndividualBook = (id) => {
  return db.query(`
    SELECT
      books.id,
      books.title,
      CONCAT(authors.firstName, ' ', authors.lastName) AS "author",
      nationalities.nationality,
      books.pgCount,
      languages.lang,
      genres.genre,
      publishers.publisher,
      books.checkoutStatus,
      books.checkoutDate,
      borrowers.id AS "borrowerid",
      CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
    FROM books
    INNER JOIN authorsbooks
       ON books.id = authorsbooks.bookID
    INNER JOIN authors
       ON authors.id = authorsbooks.authorID
    INNER JOIN nationalities
       ON nationalities.id = authors.nationID
    INNER JOIN languages
       ON books.languageID = languages.id
    INNER JOIN publishers
       ON books.publisherID = publishers.id
    INNER JOIN genrebooks
       ON books.id = genrebooks.bookID
    INNER JOIN genres
       ON genres.id = genrebooks.genreID
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    WHERE books.id = $1
    `, [id]).then((book) => {
      return book
    }).catch(function (error) {
      console.log("ERROR selecting one book: ", error.message)
    })
}

const returnBook = (id) => {
  return db.query(
    `
    UPDATE
      books
    SET
      checkoutStatus = false,
      borrowerID = NULL,
      checkoutDate = NULL
    WHERE
      id = $1;
    `, [id]).then((book) => {
      return book
    }).catch(function (error) {
      console.log("ERROR returning book: ", error.message)
    })
}

const updateBookTitle = (id, title) => {
  return db.query(
    `
    UPDATE
      books
    SET
      title = $2
    WHERE
      id = $1;`, [id, title]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating book title: ", error.message);
 })
}

// need to fix
const updateBookAuthors = (id, author) => {
  return db.query(
    `
    query to set correct authors to correct title
    `, [id, author]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating book authors: ", error.message);
 })
}

const updatePageCount = (id, pgCount) => {
  return db.query(
    `
    UPDATE
      books
    SET
      pgCount = $2
    WHERE
      id = $1;`, [id, pgCount]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating page count: ", error.message);
 })
}

const updateBookLanguage = (id, language) => {
  return db.query(
    `
    UPDATE
      books
    SET
      languageID = (SELECT id FROM languages WHERE lang =$2)
    WHERE
      id = $1;`, [id, language]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating book language: ", error.message);
 })
}

// need to fix
const updateBookGenres = (id, genre) => {
  return db.query(
    `
    query to set correct genres to correct title
    `, [id, genre]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating book genres: ", error.message);
 })
}

const updateBookPublisher = (id, publisher) => {
  return db.query(
    `
    UPDATE
      books
    SET
      publisherID = (SELECT id FROM publishers WHERE publisher =$2)
    WHERE
      id = $1;`, [id, publisher]).then((book) => {
      return book
  }).catch(function (error) {
     console.log("ERROR updating book publisher: ", error.message);
  })
}

const deleteBook = (id) => {
   return db.query(
      `

      BEGIN;

         DELETE
         FROM
         genrebooks
         WHERE bookid = $1;

         DELETE
         FROM
         authorsbooks
         WHERE bookid = $1;

         DELETE
         FROM
         books
         WHERE id = $1;

      COMMIT;`, [id]).then((result) => {
      return result
   }).catch(function (error) {
      console.log("Error with the deleteBook query", error.message);
   })
}


const borrowBookById = (id) => {
  return db.query(`
  
  SELECT * FROM books WHERE
  id= $1;
  `,[id]).then((books) =>{
    return books
  }).catch(function(error){
    console.log("Error querying for the database to borrow a book:", error.message);
  })
}


const bookBorrowingUpdate = (borrower, bookTitle, bookCheckoutdate) => {

  return db.query(`

  UPDATE
    books
  SET
    checkoutStatus = True,
    borrowerID =  $1,
    checkoutDate = $3
  WHERE title = $2;

  `, [borrower, bookTitle, bookCheckoutdate]).then((resultsOfCheckout) =>{
    return resultsOfCheckout
  }).catch(function(error){
    console.log("Error in the query to update the book to be checkout:", error.message);
  })
}

//  do $$

//  DECLARE
//  author varchar;
//  BEGIN
//  FOREACH author IN ARRAY $1
//  LOOP

//  INSERT INTO authorsbooks(bookid, authorid)
//  VALUES((SELECT id FROM books WHERE title = $2),
//    (SELECT id FROM authors WHERE CONCAT(authors.firstName, ' ', authors.lastName) = author));
//  END LOOP;
//  END;
//  $$ LANGUAGE plpgsql;

const deleteAuthorsFromSingleBook = (id, existingAuthors) =>{

  if(typeof existingAuthors =='string'){
    var authorArr =[];
    authorArr.push(existingAuthors);
    var inserts = [id, authorArr];

  }else{
    var inserts = [id, existingAuthors];
  }


  return db.query(`
    do $$

    DECLARE
      author varchar;
    BEGIN
      FOREACH author IN ARRAY $2
        LOOP
          DELETE
          FROM authorsbooks
          WHERE bookid = $1 
          AND authorid in (SELECT id FROM authors WHERE CONCAT(authors.firstName, ' ', authors.lastName) = author);
        END LOOP;
        END;
    $$ LANGUAGE plpgsql;
  `, inserts).then((resultFromDelete)=>{

    return resultFromDelete
  }).catch(function(error){
    console.log("Error in the deleteAuthorsFromSingleBook query", error.message);
  })
}


const deleteGenresFromSingleBook = (id, existingGenres) => {

  if (typeof existingGenres == 'string') {
    var genreArr = [];
    genreArr.push(existingGenres);
    var inserts = [id, genreArr];

  } else {
    var inserts = [id, existingGenres];
  }

  return db.query(`
    do $$

    DECLARE
      g varchar;
    BEGIN
      FOREACH g IN ARRAY $2
        LOOP
          DELETE
          FROM genrebooks
          WHERE bookid = $1 
          AND genreid in (SELECT id FROM genres WHERE genre = g);
        END LOOP;
        END;
    $$ LANGUAGE plpgsql;
  `, inserts).then((resultFromDelete) => {

    return resultFromDelete
  }).catch(function (error) {
    console.log("Error in the deleteAuthorsFromSingleBook query", error.message);
  })
}




module.exports = {
  selectAllBooks,
  selectBooksByTitle,
  selectBooksByAuthor,
  selectBooksByAuthorNationality,
  selectBooksByLanguage,
  selectBooksByGenre,
  selectBooksByPublisher,
  selectBooksByBorrowedStatus,
  selectBooksByBorrower,
  selectIndividualBook,
  returnBook,
  updateBookTitle,
  updateBookAuthors,
  updatePageCount,
  updateBookLanguage,
  updateBookGenres,
  updateBookPublisher,
  deleteBook,
  borrowBookById,
  bookBorrowingUpdate,
  deleteAuthorsFromSingleBook,
  deleteGenresFromSingleBook
}
