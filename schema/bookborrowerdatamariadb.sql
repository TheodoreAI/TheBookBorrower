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
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    lang varchar(255) NOT NULL
);

CREATE TABLE publishers (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    publisher varchar(255) NOT NULL
);

CREATE TABLE borrowers (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    lastName varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    phone varchar(150) NOT NULL,
    email varchar(255) NOT NULL);

CREATE TABLE nationalities (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    nationality varchar(255)
);

CREATE TABLE authors (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    lastName varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    nationID int,
    CONSTRAINT FOREIGN KEY (nationID) REFERENCES nationalities (id));

CREATE TABLE genres (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    genre varchar(255) NOT NULL
);

CREATE TABLE books (id int(11) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    checkoutStatus BOOLEAN NOT NULL,
    pgCount int(11) NOT NULL,
    languageID int,
    publisherID int,
    borrowerID int,
    CONSTRAINT FOREIGN KEY (languageID) REFERENCES languages (id),
    CONSTRAINT FOREIGN KEY (publisherID) REFERENCES publishers (id),
    CONSTRAINT FOREIGN KEY (borrowerID) REFERENCES borrowers (id),
    checkoutDate DATE
);

CREATE TABLE genrebooks (
    genreID int,
    bookID int,
    CONSTRAINT FOREIGN KEY (genreID) REFERENCES genres (id),
    CONSTRAINT FOREIGN KEY (bookID) REFERENCES books (id)
);

CREATE TABLE authorsbooks (
    bookID int,
    authorID int,
    CONSTRAINT FOREIGN KEY (bookID) REFERENCES books (id),
    CONSTRAINT FOREIGN KEY (authorID) REFERENCES authors (id)
);

-- To insert data into the tables:



INSERT INTO `languages` (lang)
VALUES
("English"),
("Spanish"),
("French");

INSERT INTO `publishers` (publisher)
VALUES
("Simon & Schuster"),
("Thomas Dunne Books"),
("Palala Press"),
("Penguin Books"),
("Minnesota Historical Society Press"),
("Sexto Piso"),
("Independently published"),
("Hodder & Stoughton");


INSERT INTO `borrowers` (lastName, firstName, phone, email)
VALUES('Smith', 'Rhonda', '123-456-7891', 'rhonda@thebookborrower.com'),
('Estrada', 'Mateo', '987-654-3210', 'mateo@thebookborrower.com'),
('Rascal', 'Oscar', '123-456-7891', 'rascal@thebookborrower.com'),
('Allen', 'Barry', '415-123-4567', 'barry@thebookborrower.com'),
('West', 'Wally', '562-123-4567', 'wally@thebookborrower.com');

INSERT INTO `nationalities`(nationality)
VALUES
("Canadian"),
("American"),
("Mexican"),
("French");


INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Trebek", "Alex", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "Canadian";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Rogak", "Lisa", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Bourke-White", "Margaret", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Carroll", "Jim", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Parks", "Gordon", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Luiselli", "Valeria", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "Mexican";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "Hugo", "Victor", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "French";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "King", "Stephen", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO `authors` (lastName, firstName, nationID)
SELECT "King", "Owen", nationalities.id
FROM nationalities
WHERE nationalities.nationality = "American";

INSERT INTO  `genres` (genre)
VALUES
("Biography"),
("Non-Fiction"),
("Autobiography"),
("Fiction"),
("Thriller");

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID, borrowerID, checkoutDate)
VALUES
("The Answer Is... Reflections on My Life", TRUE, 297,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Simon & Schuster"),
(SELECT id from borrowers WHERE firstName="Rhonda" AND lastName="Smith"),
 '2020/01/30');

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID, borrowerID, checkoutDate)
VALUES
("Who is Alex Trebek?: A Biography", TRUE, 256,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Thomas Dunne Books"),
(SELECT id from borrowers WHERE firstName="Mateo" AND lastName="Estrada"),
 '2020/01/30');

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID)
VALUES
("Portrait of Myself", FALSE, 388,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Palala Press"));


INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID)
VALUES
("The Basketball Diaries", FALSE, 224,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Penguin Books"));


INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID)
VALUES
("A Choice of Weapons", FALSE, 192,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Minnesota Historical Society Press"));

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID)
VALUES
("Papeles falsos", FALSE, 79,
(SELECT id from languages WHERE lang="Spanish"),
(SELECT id from publishers WHERE publisher="Sexto Piso"));

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID)
VALUES
("Les Miserables", FALSE, 814,
(SELECT id from languages WHERE lang="French"),
(SELECT id from publishers WHERE publisher="Independently published"));

INSERT INTO `books` (title, checkoutStatus, pgCount, languageID, publisherID, borrowerID, checkoutDate)
VALUES
("Sleeping Beauties", TRUE, 721,
(SELECT id from languages WHERE lang="English"),
(SELECT id from publishers WHERE publisher="Hodder & Stoughton"),
(SELECT id from borrowers WHERE firstName="Mateo" AND lastName="Estrada"),
 '2020/03/03');

 -- Inserting into the joining tables:

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Non-fiction"),
    (SELECT id from books WHERE title="The Answer Is... Reflections on My Life")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Biography"),
    (SELECT id from books WHERE title="The Answer Is... Reflections on My Life")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Autobiography"),
    (SELECT id from books WHERE title="The Answer Is... Reflections on My Life")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Non-fiction"),
    (SELECT id from books WHERE title="Who is Alex Trebek?: A Biography")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Biography"),
    (SELECT id from books WHERE title="Who is Alex Trebek?: A Biography")
 );


INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Biography"),
    (SELECT id from books WHERE title="Portrait of Myself")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Non-fiction"),
    (SELECT id from books WHERE title="Portrait of Myself")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Autobiography"),
    (SELECT id from books WHERE title="Portrait of Myself")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Non-fiction"),
    (SELECT id from books WHERE title="The Basketball Diaries")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Biography"),
    (SELECT id from books WHERE title="The Basketball Diaries")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Autobiography"),
    (SELECT id from books WHERE title="The Basketball Diaries")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Non-fiction"),
    (SELECT id from books WHERE title="A Choice of Weapons")
 );

INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Biography"),
    (SELECT id from books WHERE title="A Choice of Weapons")
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Autobiography"),
    (SELECT id from books WHERE title="A Choice of Weapons")
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Fiction"),
    (SELECT id from books WHERE title="Papeles falsos")
 );


 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Fiction"),
    (SELECT id from books WHERE title= "Les Miserables")
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Fiction"),
    (SELECT id from books WHERE title= "Sleeping Beauties")
 );

 INSERT INTO genrebooks (genreID, bookID)
 VALUES(
    (SELECT id from genres WHERE genre="Thriller"),
    (SELECT id from books WHERE title= "Sleeping Beauties")
 );


 -- Inserting into the authorbooks table:

INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title="The Answer Is... Reflections on My Life"),
     (SELECT id FROM authors WHERE firstName="Alex" AND lastName="Trebek")
 );


INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title="Who is Alex Trebek?: A Biography"),
     (SELECT id FROM authors WHERE firstName="Lisa" AND lastName="Rogak")
 );

INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title="Portrait of Myself"),
     (SELECT id FROM authors WHERE firstName="Margaret" AND lastName="Bourke-White")
 );

INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title="The Basketball Diaries"),
     (SELECT id FROM authors WHERE firstName="Jim" AND lastName="Carroll")
 );

INSERT INTO authorsbooks (bookID, authorID)
 VALUES(
     (SELECT id FROM books WHERE title="A Choice of Weapons"),
     (SELECT id FROM authors WHERE firstName="Gordon" AND lastName="Parks")
 );

 INSERT INTO authorsbooks (bookID, authorID)
  VALUES(
      (SELECT id FROM books WHERE title="Papeles falsos"),
      (SELECT id FROM authors WHERE firstName="Valeria" AND lastName="Luiselli")
  );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
       (SELECT id FROM books WHERE title="Les Miserables"),
       (SELECT id FROM authors WHERE firstName="Victor" AND lastName="Hugo")
   );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
      (SELECT id FROM books WHERE title="Sleeping Beauties"),
      (SELECT id FROM authors WHERE firstName="Stephen" AND lastName="King")
  );

  INSERT INTO authorsbooks (bookID, authorID)
   VALUES(
      (SELECT id FROM books WHERE title="Sleeping Beauties"),
      (SELECT id FROM authors WHERE firstName="Owen" AND lastName="King")
  );
