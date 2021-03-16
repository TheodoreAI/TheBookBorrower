-- The following file contains all the SQL queries used in our website to the database we built.


-- CREATE:

-- Inserting into borrowers table
INSERT INTO borrowers
                            (firstName, lastName, email, phone)
                            VALUES($1, $2, $3, $4);

-- Insert into genres
INSERT INTO genres (genre)
                            VALUES($1);

-- Insert into languages
INSERT INTO languages (lang)
                           VALUES($1);



-- Insert into publisher
INSERT INTO publishers (publisher)
                            VALUES($1);

-- insert into nationalities
INSERT INTO nationalities (nationality)
                            VALUES($1);



-- Insert books that are not checked out into books table:
BEGIN;
                INSERT INTO books(title, checkoutstatus, pgcount, languageid, publisherid)
                VALUES($1, $2, $3,
                    (SELECT id FROM languages WHERE lang = $5),
                    (SELECT id FROM publishers WHERE publisher = $4));

COMMIT;



-- Insert books that are checked out into books table:
 BEGIN;

                INSERT INTO books (title, checkoutstatus, pgcount, languageid, publisherid, borrowerid, checkoutdate)
                VALUES($1, $2, $5,
                (SELECT id FROM languages WHERE lang = $7),
                (SELECT id FROM publishers WHERE publisher = $6),
                (SELECT id FROM borrowers WHERE CONCAT(borrowers.firstName, ' ', borrowers.lastName) = $3),
                $4);

COMMIT;


-- Insert into the authors books table:



  do $$

            DECLARE
                author varchar;
            BEGIN
                        FOREACH author IN ARRAY $1
                        LOOP

                            INSERT INTO authorsbooks (bookid, authorid)
                            VALUES((SELECT id FROM books WHERE title=$2),
                                    (SELECT id FROM authors WHERE CONCAT(authors.firstName, ' ', authors.lastName) = author));
                        END LOOP;
            END; $$ LANGUAGE plpgsql;



-- Insert into the genresbooks table:


 do $$

        DECLARE
            g varchar;
        BEGIN
                    FOREACH g IN ARRAY $1
                    LOOP
                        INSERT INTO genrebooks (genreid, bookid)
                        VALUES((SELECT id FROM genres WHERE genre = g),
                                (SELECT id FROM books WHERE title = $2));
                    END LOOP;
        END; $$ LANGUAGE plpgsql;



INSERT INTO authors (lastname, firstname, nationid)
                            VALUES($1, $2, (SELECT id FROM nationalities WHERE nationality = $3));

-- READ:

SELECT * FROM nationalities

SELECT * FROM genres

SELECT * FROM languages

SELECT * FROM publishers


SELECT CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "fullName" FROM borrowers;


SELECT CONCAT(authors.firstname, ' ', authors.lastname) AS "fullName" FROM authors;


SELECT title FROM books;

 SELECT
    borrowers.id,
      CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "name", borrowers.phone, borrowers.email,
      borrowers.id = books.borrowerID AS "borrowingstatus"
    FROM
    borrowers
    LEFT JOIN books
    ON borrowers.id = books.borrowerID
      WHERE lower(CONCAT(borrowers.firstName, ' ',borrowers.lastName)) LIKE lower($1);


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

SELECT
      borrowers.id,
      CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "name", borrowers.phone, borrowers.email,
      borrowers.id = books.borrowerID AS "borrowingstatus"
    FROM
      borrowers
    LEFT JOIN books
       ON borrowers.id = books.borrowerID



SELECT * FROM books WHERE
  id= $1;


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
      lower(books.title) LIKE lower($1)



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
      lower(CONCAT(authors.firstName, ' ', authors.lastName)) LIKE lower($1)




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
      lower(nationalities.nationality) LIKE lower($1)





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
      lower(languages.lang) LIKE lower($1)






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
      lower(genres.genre) LIKE lower($1)





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
      lower(publishers.publisher) LIKE lower($1)




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
      books.checkoutStatus = $1




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
      lower(CONCAT(borrowers.firstName, ' ', borrowers.lastName)) LIKE lower($1)



-- selecting book using an ID:
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


-- UPDATE:



   UPDATE
      borrowers
    SET
      lastName = $2,
      firstName = $3,
      email = $4,
      phone = $5
    WHERE
      id = $1;

UPDATE
    books
  SET
    checkoutStatus = True,
    borrowerID =  $1,
    checkoutDate = $3
  WHERE title = $2;

UPDATE
      books
    SET
      checkoutStatus = false,
      borrowerID = NULL,
      checkoutDate = NULL
    WHERE
      id = $1;


  UPDATE
      books
    SET
      title = $2
    WHERE
      id = $1;


  UPDATE
      books
    SET
      pgCount = $2
    WHERE
      id = $1;

   UPDATE
      books
    SET
      languageID = (SELECT id FROM languages WHERE lang =$2)
    WHERE
      id = $1;


  UPDATE
      books
    SET
      publisherID = (SELECT id FROM publishers WHERE publisher =$2)
    WHERE
      id = $1;
      
-- DELETE:

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
    COMMIT;

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

      COMMIT;



-- Delete from the M:M relationship table authorsbooks using a loop:

    do $$

    DECLARE
      author varchar;
    BEGIN
      FOREACH author IN ARRAY $2
        LOOP
          DELETE
          FROM authorsbooks
          WHERE bookid = $1
          AND authorid in (SELECT id FROM authors WHERE CONCAT(authors.firstName, ' ', authors.lastName) = author);
        END LOOP;
        END;
    $$ LANGUAGE plpgsql;




-- Deleting from a M:M relationship using a for loop:
  do $$

    DECLARE
      g varchar;
    BEGIN
      FOREACH g IN ARRAY $2
        LOOP
          DELETE
          FROM genrebooks
          WHERE bookid = $1
          AND genreid in (SELECT id FROM genres WHERE genre = g);
        END LOOP;
        END;
    $$ LANGUAGE plpgsql;