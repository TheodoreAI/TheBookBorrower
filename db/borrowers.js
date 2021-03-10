const db = require('../dbcon.js')
const deleteBorrowerModule = require('../public/deleteforms.js');


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
      books.title,
      books.id AS "bookid"
    FROM borrowers
    LEFT JOIN books
       ON borrowers.id = books.borrowerID
    WHERE borrowers.id = $1
    `, [id]).then((borrower) => {
     
      
      return borrower
    }).catch(function (error) {
      console.log("ERROR selecting one borrower: ", error.message)
    })
}


const updateBorrower = (id, firstName, lastName, phone, email) => {

  return db.query(`
    UPDATE
      borrowers
    SET
      lastName = $2,
      firstName = $3,
      email = $4,
      phone = $5
    WHERE
      id = $1;`, [id, lastName, firstName, email, phone]).then((borrower) => {
      return borrower
    }).catch(function (error) {
      console.log("ERROR updating borrower's phone number: ", error.message)
    })
}



const deleteBorrower = (id) => {
  
  return db.query(
    `
    BEGIN;
        UPDATE
          books 
        SET
          checkoutStatus = FALSE,
          checkoutDate = NULL
        WHERE borrowerID = $1;

        DELETE
        FROM
          borrowers 
        WHERE id = $1;

      
    COMMIT;`,[id]).then((borrower) =>{
      return borrower
    }).catch(function(error){
      console.log("Error deleting borrower by their id", error.message);
    });
  
}


module.exports = {
  selectAllBorrowers,
  selectIndividualBorrower,
  updateBorrower,
  deleteBorrower

}
