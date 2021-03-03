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
    LEFT JOIN borrowers
       ON borrowers.id = books.borrowerID
    `).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting all books: ", error.message)
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

module.exports = {
  selectAllBooks,
  selectIndividualBook
}
