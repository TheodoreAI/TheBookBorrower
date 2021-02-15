INSERT INTO nationalities(nation)
VALUES
("Canadian"),
("American"),
("Mexican");

INSERT INTO  genres (genre)
VALUES
("Biography"),
("NON_FICTION"),
("Autobiography");


INSERT INTO authors (lastName, firstName, nationID)
SELECT "Trebek", "Alex", nationalities.nation
FROM nationalities;

INSERT INTO publishers (publisher)
VALUES
("Simon & Schuster"),
("Thomas Dunne Books"),
("Palala Press"),
("Penguin Books"),
("Minnesota Historical Society Press");

INSERT INTO languages (lang)
VALUES
("English"),
("Spanish"),
("French");

INSERT INTO book (title, checkoutStatus, pgCount, languageID, publisherID, borrowerID)

SELECT "The Answer Is... Reflections on My Life	", 1, 297, languages.id, publishers.id, borrowers.id,
SELECT "Who is Alex Trebek?: A Biography", 1, 256, languages.id, publishers.id, borrowers.id,
SELECT "Portrait of Myself", 0, 388, languages.id, publishers.id, borrowers.id,
SELECT "The Basketball Diaries", 0, 224, languages.id, publishers.id, borrowers.id,
SELECT "A Choice of Weapons", 0, 192, languages.id, publishers.id, borrowers.id
FROM languages, publishers, borrowers;


INSERT INTO borrowers (lastName, firstName, phone, email)

VALUES
("Smith", "Rhonda", "123-456-7891", "rhonda@thebookborrower.com"),
("Estrada", "Mateo", "987-654-3210", "mateo@thebookborrower.com"),
("Rascal", "Oscar", "123-456-7891", "rascal@thebookborrower.com"),
("Allen", "Barry", "415-123-4567", "barry@thebookborrower.com"),
("West", "Wally", "562-123-4567", "wally@thebookborrower.com");


