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
      books.title LIKE $1
    `, ['%' + title + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting all books: ", error.message)
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
      CONCAT(authors.firstName, ' ', authors.lastName) LIKE $1
    `, ['%' + author + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting all books: ", error.message)
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
      nationalities.nationality LIKE $1
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
      languages.lang LIKE $1
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
      genres.genre = $1
    `, [genre]).then((books) => {
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
      publishers.publisher LIKE $1
    `, ['%' + publisher + '%']).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting books by publisher: ", error.message)
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
      console.log("Database query", book);
      return book
    }).catch(function (error) {
      console.log("ERROR selecting one book: ", error.message)
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





module.exports = {
  selectAllBooks,
  selectBooksByTitle,
  selectBooksByAuthor,
  selectBooksByAuthorNationality,
  selectBooksByLanguage,
  selectBooksByGenre,
  selectBooksByPublisher,
  selectIndividualBook,
  deleteBook
}
