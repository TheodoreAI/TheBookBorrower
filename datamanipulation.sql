-- search for books from the Books page:
-- title:
SELECT books.title,
CONCAT (authors.firstName, " ", authors.lastName) AS 'author',
books.checkoutStatus,
CONCAT (borrowers.firstName, " ", borrowers.lastName) AS 'borrower'
FROM books, authors, borrowers, authorsbooks
WHERE books.title = :title_input
AND authorsbooks.bookID = books.id
AND books.borrowerID = borrowers.id;

-- author:
SELECT books.title, authors.firstName, authors.lastName FROM
books b JOIN authorsbooks ab ON
b.id = ab.bookID JOIN authors a ON


SELECT books.title,
CONCAT (authors.firstName, " ", authors.lastName) AS 'author',
books.checkoutStatus,
CONCAT (borrowers.firstName, " ", borrowers.lastName) AS 'borrower'
FROM books, authors, borrowers, authorsbooks
WHERE CONCAT (authors.firstName, " ", authors.lastName) = "Gordon Parks"
AND authorsbooks.bookID = books.id
AND (borrowers.id = books.borrowerID OR books.borrowerID IS NULL)
GROUP BY title;

-- author nationality:
SELECT books(title), authors (full_name) books(status), borrowers (full_name)
FROM books, authors, borrowers, nationalties
WHERE nationality = :nationality_input
AND authors(nation_id) = nationality(id)
AND authors_books (book_id) = books(id)
AND books (borrower_id) = borrowers(id);

-- language:
SELECT books(title), authors (full_name) books(status), borrowers (full_name)
FROM books, authors, borrowers
WHERE
AND authors_books (book_id) = books(id)
AND books (borrower_id) = borrowers(id);

-- genre:
SELECT books(title), authors (full_name) books(status), borrowers (full_name)
FROM books, authors, borrowers
WHERE
AND authors_books (book_id) = books(id)
AND books (borrower_id) = borrowers(id);

-- publisher:
SELECT books(title), authors (full_name) books(status), borrowers (full_name)
FROM books, authors, borrowers
WHERE
AND authors_books (book_id) = books(id)
AND books (borrower_id) = borrowers(id);

-- borrowed status:
-- if user chooses YES:
SELECT title,
CONCAT (authors.firstName, " ", authors.lastName) AS 'author',
checkoutStatus,
CONCAT (borrowers.firstName, " ", borrowers.lastName) AS 'borrower'
FROM books, authors, borrowers, authorsbooks
WHERE authorsbooks.bookID = books.id
AND authorsbooks.authorID = authors.id
AND books.borrowerID = borrowers.id;

-- if user chooses NO:
SELECT title,
CONCAT (authors.firstName, " ", authors.lastName) AS 'author'
FROM books, authors, borrowers, authorsbooks
WHERE authorsbooks.bookID = books.id
AND authorsbooks.authorID = authors.id
AND books.borrowerID IS NULL
GROUP BY title;

-- borrower:
SELECT books(title), authors (full_name) books(status), borrowers (full_name)
FROM books, authors, borrowers
WHERE borrowers(full_name) = :borrower_input
AND authors_books (book_id) = books(id)
AND books (borrower_id) = borrowers(id);

-- get all Books for the Books page
SELECT title,
CONCAT (authors.firstName, " ", authors.lastName) AS 'author',
checkoutStatus,
CONCAT (borrowers.firstName, " ", borrowers.lastName) AS 'borrower'
FROM books, authors, borrowers, authorsbooks
WHERE authorsbooks.bookID = books.id
AND authorsbooks.authorID = authors.id
AND books.borrowerID = borrowers.id;

-- if book is borrowed (user clicks "borrow"):
-- change status of book:
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

-- search for borrowers on Borrowers page:
SELECT full_name, phone, email FROM borrowers WHERE full_name = :name_in_box;
-- how to get titles of books?

-- get all borrowers for the borrowers page:
SELECT full_name, phone, email FROM borrowers
-- how to get status of borrowing books?

-- update info for individual borrowers from the borrowers page

-- delete individual borrowers from the borrowers page
-- this should break connection in books_borrowers table

--Add to database page (also need to fix close buttons on forms - they both say 'author')
-- borrowers (how to concatenate name?):
INSERT INTO borrowers (first_name, last_name, email, phone)
VALUES (:first_name_input, :last_name_input, :email_input, :phone_input);

-- books:
INSERT INTO books ()
