-- search for books from the Books page & get filtered list:
-- filter by title:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID
WHERE books.title = :title_input;

-- filter by author:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID AND CONCAT(authors.firstName, " ", authors.lastName) = :author_input
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;


-- filter by author nationality:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN nationalities
   ON nationalities.id = authors.nationID AND nationalities.nationality = :nationality_input
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;


-- filter by language:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN languages
   ON languages.id = books.languageID AND languages.lang = :language_input
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;


-- filter by genre:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN genrebooks
  ON books.id = genrebooks.bookID
INNER JOIN genres
  ON genres.id = genrebooks.genreID AND genres.genre = :genre_input
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN publishers
   ON books.publisherID = publishers.id
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;

-- filter by publisher:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN publishers
   ON books.publisherID = publishers.id AND publishers.publisher = :publisher_input;
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;


-- filter by borrowed status:
-- if user chooses YES:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN borrowers
   ON borrowers.id = books.borrowerID;

-- if user chooses NO:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
WHERE books.checkoutStatus = FALSE;

-- filter by borrower name:
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
INNER JOIN borrowers
   ON borrowers.id = books.borrowerID
   WHERE CONCAT(borrowers.firstName, " ", borrowers.lastName) = :borrower_input;

-- get list of ALL Books for the Books page
SELECT books.title, CONCAT(authors.firstName, " ", authors.lastName) AS 'Author', books.checkoutStatus, books.borrowerID, CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Borrower Name:'
FROM books
INNER JOIN authorsbooks
   ON books.id = authorsbooks.bookID
INNER JOIN authors
   ON authors.id = authorsbooks.authorID
LEFT JOIN borrowers
   ON borrowers.id = books.borrowerID;

-- if book is borrowed (user clicks "borrow"):
-- change status of book, make checkout date today's date:
UPDATE books
SET status = TRUE
WHERE status = FALSE;

-- if book is returned (user clicks "return"):
UPDATE books
SET status = FALSE, borrower_id = NULL, checkout_date = NULL
WHERE status = TRUE, borrower_id IS NOT NULL, checkout_date IS NOT NULL;

-- get all popup info for individual books on the Books page
SELECT books(title), authors(full_name), nationalities(nationality), books(pages),

FROM books WHERE title = :title_clicked_from_books_page

-- update info for individual books in pop up from the Books page
-- this will be a form in the popup
UPDATE books
SET books(title) = :title_input_or_current_value,
books(authorID) = :author_dropdown_or_current_value, -- should also delete from AuthorBooks?
... author nationality?
books(pageCount) = :pageCount_input_or_current_value,
books(languageID) = :language_dropdown_or_current_value,
... genres? -- some kind of delete from GenreBooks here?
books(publisherID) = :publisher_dropdown_or_current_value,
WHERE books(title) = :title_user_clicked;

-- delete individual books in pop up from the Books page
-- this should break connection in books_borrowers, authors_books tables

-- search for borrowers on Borrowers page & get filtered list:
SELECT CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Name', borrowers.phone, borrowers.email, (SELECT IF (borrowers.id = books.borrowerID, 'Yes', 'No')) AS 'Currently borrowing books?'
FROM borrowers
LEFT JOIN books
   ON borrowers.id = books.borrowerID
   WHERE CONCAT(borrowers.firstName, " ", borrowers.lastName) = :borrower_input


-- get list of ALL borrowers for the borrowers page:
SELECT CONCAT(borrowers.firstName, " ", borrowers.lastName) AS 'Name', borrowers.phone, borrowers.email, (SELECT IF (borrowers.id = books.borrowerID, 'Yes', 'No')) AS 'Currently borrowing books?'
FROM borrowers
LEFT JOIN books
   ON borrowers.id = books.borrowerID;


-- update info for individual borrowers from the borrowers page
-- These queries will be implemented in the books and borrowers pages.


UPDATE books
SET title = :input_title, 
   checkoutStatus = :input_status, 
   pgCount = :input_pgCount
   checkout_date = :input_date, 
   borrowerID = :input_borrower_id, 
   languageID = :input_publisher, 
   publisherID= :input_publisher


-- delete individual borrowers from the borrowers page
-- this should break connection in books_borrowers table
-- These queries will be implemented in the borrowers page and in the books page
DELETE FROM books
WHERE title = :input_title, 
   checkoutStatus = :input_status, 
   pgCount = :input_pgCount
   checkout_date = :input_date, 
   borrowerID = :input_borrower_id, 
   languageID = :input_publisher, 
   publisherID= :input_publisher

DELETE FROM genres
WHERE genre = :input_genre

DELETE FROM genrebooks


DELETE FROM publishers
WHERE publisher = :input_publisher

DELETE FROM borrowers
WHERE firstName = :input_firstName,

DELETE FROM nationalities

DELETE FROM authors

DELETE FROM authorsbooks

DELETE FROM languages


--Add to database page
-- (also need to fix close buttons on forms - they both say 'author', also need individual forms for tables like author etc.)
-- borrowers (how to concatenate name?):

-- books:
INSERT INTO books ()
