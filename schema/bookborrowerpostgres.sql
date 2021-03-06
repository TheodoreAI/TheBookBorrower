-- If you need to drop the tables use the following:
DROP TABLE IF EXISTS genrebooks;
DROP TABLE IF EXISTS authorsbooks;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS nationalities;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS publishers;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS borrowers;

-- The tables have all been tested and you can make them by running the following command:

-- source ~/thebookborrower.sql -- make sure you have the right path to the file and that you are running the MariaDB

CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    lang varchar(255) NOT NULL
);

CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    publisher varchar(255) NOT NULL
);

CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,
    lastName varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    phone varchar(150) NOT NULL,
    email varchar(255) NOT NULL
);

CREATE TABLE nationalities (
    id SERIAL PRIMARY KEY,
    nationality varchar(255)
);

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    lastName varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    nationID INTEGER REFERENCES nationalities(id)
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre varchar(255) NOT NULL
);

CREATE TABLE books (id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    checkoutStatus BOOLEAN NOT NULL,
    pgCount INTEGER NOT NULL,
    languageID INTEGER REFERENCES languages(id) ON DELETE SET DEFAULT,
    publisherID INTEGER REFERENCES publishers(id) ON DELETE SET DEFAULT,
    borrowerID INTEGER REFERENCES borrowers(id) ON DELETE SET DEFAULT,
    checkoutDate DATE
);

CREATE TABLE genrebooks (
    genreID INTEGER REFERENCES genres(id) ON DELETE SET DEFAULT,
    bookID INTEGER REFERENCES books(id) ON DELETE SET DEFAULT
);

CREATE TABLE authorsbooks (
    bookID INTEGER REFERENCES books(id) ON DELETE SET DEFAULT,
    authorID INTEGER REFERENCES authors(id) ON DELETE SET DEFAULT
);

-- To insert data into the base tables:

INSERT INTO languages(lang)
  VALUES ('English'),
  ('Spanish'),
  ('French');

INSERT INTO publishers(publisher)
  VALUES ('Simon & Schuster'),
  ('Thomas Dunne Books'),
  ('Palala Press'),
  ('Penguin Books'),
  ('Minnesota Historical Society Press'),
  ('Sexto Piso'),
  ('Independently published'),
  ('Hodder & Stoughton');


INSERT INTO borrowers (lastName, firstName, phone, email)
  VALUES('Smith', 'Rhonda', '123-456-7891', 'rhonda@thebookborrower.com'),
  ('Estrada', 'Mateo', '987-654-3210', 'mateo@thebookborrower.com'),
  ('Rascal', 'Oscar', '123-456-7891', 'rascal@thebookborrower.com'),
  ('Allen', 'Barry', '415-123-4567', 'barry@thebookborrower.com'),
  ('West', 'Wally', '562-123-4567', 'wally@thebookborrower.com');

INSERT INTO nationalities (nationality)
  VALUES ('Canadian'),
  ('American'),
  ('Mexican'),
  ('French');


INSERT INTO authors (lastName, firstName, nationID)
  VALUES ('Trebek', 'Alex', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'Canadian')),
  ('Rogak', 'Lisa', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American')),
  ('Bourke-White', 'Margaret', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American')),
  ('Carroll', 'Jim', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American')),
  ('Parks', 'Gordon', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American')),
  ('Luiselli', 'Valeria', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'Mexican')),
  ('Hugo', 'Victor', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'French')),
  ('King', 'Stephen', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American')),
  ('King', 'Owen', (SELECT nationalities.id FROM nationalities WHERE nationalities.nationality = 'American'));




INSERT INTO  genres (genre)
  VALUES ('Biography'),
  ('Nonfiction'),
  ('Autobiography'),
  ('Fiction'),
  ('Thriller');

INSERT INTO books (title, checkoutStatus, pgCount, languageID, publisherID, borrowerID, checkoutDate)
 VALUES ('The Answer Is... Reflections on My Life', TRUE, 297, (SELECT id from languages WHERE lang='English'), (SELECT id from publishers WHERE publisher='Simon & Schuster'), (SELECT id from borrowers WHERE firstName='Rhonda' AND lastName='Smith'), '2020/01/30'),
('Who is Alex Trebek?: A Biography', TRUE, 256, (SELECT id from languages WHERE lang='English'), (SELECT id from publishers WHERE publisher='Thomas Dunne Books'), (SELECT id from borrowers WHERE firstName='Mateo' AND lastName='Estrada'), '2020/01/30'),
('Portrait of Myself', FALSE, 388, (SELECT id from languages WHERE lang='English'), (SELECT id from publishers WHERE publisher='Palala Press'), NULL, NULL),
('The Basketball Diaries', FALSE, 224, (SELECT id from languages WHERE lang='English'), (SELECT id from publishers WHERE publisher='Penguin Books'), NULL, NULL),
('A Choice of Weapons', FALSE, 192, (SELECT id from languages WHERE lang='English'), (SELECT id from publishers WHERE publisher='Minnesota Historical Society Press'), NULL, NULL),
('Papeles falsos', FALSE, 79, (SELECT id FROM languages WHERE lang='Spanish'),(SELECT id FROM publishers WHERE publisher = 'Sexto Piso'), NULL, NULL),
('Les Miserables', FALSE, 814, (SELECT id FROM languages WHERE lang='French'), (SELECT id FROM publishers WHERE publisher = 'Independently published'), NULL, NULL),
('Sleeping Beauties', TRUE, 721, (SELECT id FROM languages WHERE lang='English'), (SELECT id FROM publishers WHERE publisher='Hodder & Stoughton'), (SELECT id FROM borrowers WHERE firstName='Mateo' AND lastName='Estrada'), '2021/03/03');

-- Inserting into the joining tables:
INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre='Nonfiction'),
    (SELECT id from books WHERE title='The Answer Is... Reflections on My Life')
 ),
 (
    (SELECT id from genres WHERE genre='Biography'),
    (SELECT id from books WHERE title='The Answer Is... Reflections on My Life')
 ),
 (
    (SELECT id from genres WHERE genre='Autobiography'),
    (SELECT id from books WHERE title='The Answer Is... Reflections on My Life')
 ),
(
    (SELECT id from genres WHERE genre='Nonfiction'),
    (SELECT id from books WHERE title='Who is Alex Trebek?: A Biography')
 ),
 (
    (SELECT id from genres WHERE genre='Biography'),
    (SELECT id from books WHERE title='Who is Alex Trebek?: A Biography')
 ),
(
    (SELECT id from genres WHERE genre='Biography'),
    (SELECT id from books WHERE title='Portrait of Myself')
 ),
(
    (SELECT id from genres WHERE genre='Nonfiction'),
    (SELECT id from books WHERE title='Portrait of Myself')
 ),
(
    (SELECT id from genres WHERE genre='Autobiography'),
    (SELECT id from books WHERE title='Portrait of Myself')
 ),
(
    (SELECT id from genres WHERE genre='Nonfiction'),
    (SELECT id from books WHERE title='The Basketball Diaries')
 ),
(
    (SELECT id from genres WHERE genre='Biography'),
    (SELECT id from books WHERE title='The Basketball Diaries')
 ),
(
    (SELECT id from genres WHERE genre='Autobiography'),
    (SELECT id from books WHERE title='The Basketball Diaries')
 ),
(
    (SELECT id from genres WHERE genre='Nonfiction'),
    (SELECT id from books WHERE title='A Choice of Weapons')
 ),
(
    (SELECT id from genres WHERE genre='Biography'),
    (SELECT id from books WHERE title='A Choice of Weapons')
 ),
(
    (SELECT id from genres WHERE genre='Autobiography'),
    (SELECT id from books WHERE title='A Choice of Weapons')
 );



 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre='Fiction'),
    (SELECT id from books WHERE title= 'Les Miserables')
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre='Fiction'),
    (SELECT id from books WHERE title= 'Sleeping Beauties')
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre='Thriller'),
    (SELECT id from books WHERE title= 'Sleeping Beauties')
 );


INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title='The Answer Is... Reflections on My Life'),
     (SELECT id FROM authors WHERE firstName='Alex' AND lastName='Trebek')
 ),
(
     (SELECT id FROM books WHERE title='Who is Alex Trebek?: A Biography'),
     (SELECT id FROM authors WHERE firstName='Lisa' AND lastName='Rogak')
 ),
(
     (SELECT id FROM books WHERE title='Portrait of Myself'),
     (SELECT id FROM authors WHERE firstName='Margaret' AND lastName='Bourke-White')
 ),
(
     (SELECT id FROM books WHERE title='The Basketball Diaries'),
     (SELECT id FROM authors WHERE firstName='Jim' AND lastName='Carroll')
 ),
(
     (SELECT id FROM books WHERE title='A Choice of Weapons'),
     (SELECT id FROM authors WHERE firstName='Gordon' AND lastName='Parks')
 );

INSERT INTO authorsbooks (bookID, authorID)
  VALUES(
      (SELECT id FROM books WHERE title='Papeles falsos'),
      (SELECT id FROM authors WHERE firstName='Valeria' AND lastName='Luiselli')
  );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
       (SELECT id FROM books WHERE title='Les Miserables'),
       (SELECT id FROM authors WHERE firstName='Victor' AND lastName='Hugo')
   );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
      (SELECT id FROM books WHERE title='Sleeping Beauties'),
      (SELECT id FROM authors WHERE firstName='Stephen' AND lastName='King')
  );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
      (SELECT id FROM books WHERE title='Sleeping Beauties'),
      (SELECT id FROM authors WHERE firstName='Owen' AND lastName='King')
  );
