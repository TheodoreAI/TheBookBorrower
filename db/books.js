const db = require('../dbcon.js')

const selectAllBooks = () => {
  return db.query(`
    SELECT
      *
    FROM
      books
    `).then((books) => {
      return books
    }).catch(function (error) {
      console.log("ERROR selecting all books: ", error.message)
    })
}

module.exports = {
  selectAllBooks
}
