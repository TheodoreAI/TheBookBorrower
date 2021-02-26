const db = require('../dbcon.js')

const selectAllBorrowers = () => {
  return db.query(`
    SELECT
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

module.exports = {
  selectAllBorrowers
}
