const db = require('../dbcon.js')

const selectAllBorrowers = () => {
  return db.query(`
    SELECT
      *
    FROM
      borrowers
    `).then((borrowers) => {
      return borrowers
    }).catch(function (error) {
      console.log("ERROR selecting all borrowers: ", error.message)
    })
}

module.exports = {
  selectAllBorrowers
}
