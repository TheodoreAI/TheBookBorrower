const db = require('../dbcon.js')


const selectAllBooks = () => {
  return db.query(`
    SELECT
      books.title, CONCAT(authors.firstName, ' ', authors.lastName) AS "author", books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "borrower"
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

module.exports = {
  selectAllBooks
}
