const db = require('../dbcon.js')

const selectAllBorrowers = () => {
  return db.query(`
    SELECT
      borrowers.id,
      CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "name", borrowers.phone, borrowers.email,
      borrowers.id = books.borrowerID AS "borrowingstatus"
    FROM
      borrowers
    LEFT JOIN books
       ON borrowers.id = books.borrowerID
    `).then((borrowers) => {
      return borrowers
    }).catch(function (error) {
      console.log("ERROR selecting all borrowers: ", error.message)
    })
}

const selectIndividualBorrower = (id) => {
  return db.query(`
    SELECT
      CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "name",
      borrowers.phone,
      borrowers.email,
      books.title
    FROM borrowers
    LEFT JOIN books
       ON borrowers.id = books.borrowerID
    WHERE borrowers.id = $1
    `, [id]).then((borrower) => {
      console.log("the borrower: ", borrower)
      return borrower
    }).catch(function (error) {
      console.log("ERROR selecting one borrower: ", error.message)
    })
}

module.exports = {
  selectAllBorrowers,
  selectIndividualBorrower
}
