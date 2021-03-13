const db = require('../dbcon.js');


const postBorrower = (firstName, lastName, email, phone) =>{

    return db.query(`INSERT INTO borrowers
                            (firstName, lastName, email, phone) 
                            VALUES($1, $2, $3, $4);`
                            ,[firstName, lastName, email, phone]
                            ).then((post) => {

        return post[0]
    })
};



const postGenre = (genre) => {

    return db.query(`INSERT INTO genres (genre)
                            VALUES($1);`
                            , [genre])
        .then((post) => {
            return post
        })
};


const postLanguage = (lang) => {

    return db.query(`INSERT INTO languages (lang)
                           VALUES($1);`
                            , [lang])
        .then((post) => {
            return post
        })
};



const postPublisher = (publisher) => {
    return db.query(`INSERT INTO publishers (publisher)
                            VALUES($1);`
                            , [publisher])
        .then((post) => {
        return post
    })
};


const postNationality = (nationality) => {
    return db.query(`INSERT INTO nationalities (nationality)
                            VALUES($1);`
                            , [nationality])
        .then((post) =>{
            return post
        })
};



const selectAllNationalities = () => {
    return db.query(`SELECT * FROM nationalities`
    ).then((resolveNations, rejectNations) => {
        return resolveNations;
    }).catch(function (error){
        console.log("Error selecting all the nationalities:", error.message)
    });
};

const selectAllGenres = () => {
    return db.query(`SELECT * FROM genres`
    ).then((genre) => {
        return genre;
    }).catch(function (error) {
        console.log("Error selecting all the genres for the book form:", error.message);
    });
};

const selectAllLanguages = () => {
    return db.query(`SELECT * FROM languages`
    ).then((lang) => {
        return lang;
    }).catch(function (error){
        console.log("Error selecting all the languages for the book for:", error.message);
    });
};

const selectAllPublishers = () => {
    return db.query(`SELECT * FROM publishers`
    ).then((publisher) => {
        return publisher;
    }).catch(function (error){
        console.log("Error selecting all the publishers fort he books page", error.message);
    });
}


const selectAllBorrowers = () => {
    return db.query(`SELECT CONCAT(borrowers.firstName, ' ', borrowers.lastName) AS "fullName" FROM borrowers;`
    ).then((borrower) =>{
        return borrower;
    }).catch(function (error){
        console.log("Error selecting all the borrowers for the books page:", error.message);
    });
}


const selectAllAuthors = () => {
    return db.query(`SELECT CONCAT(authors.firstname, ' ', authors.lastname) AS "fullName" FROM authors;`
    ).then((author) => {
        return author;
    }).catch(function (error){
        console.log("Error selecting all the authors for the books form:", error.message);
    });
}

const selectAllBooks = () => {
    return db.query(`SELECT title FROM books;`).then((books) =>{
        return books;
    }).catch(function (error){
        console.log("Error selecting all the books from the books table:", error.message);
    });
}


const postAuthors = (lastName, firstName, nationText) => {
    console.log("what is happening?", firstName, lastName, nationText);
    return db.query(`INSERT INTO authors (lastname, firstname, nationid)             
                            VALUES($1, $2, (SELECT id FROM nationalities WHERE nationality = $3));`,
                    [lastName, firstName, nationText]).then((authors) => {
                        return authors;
    }).catch(function (error) {
        console.log("Error posting the author into the authors table: ", error.message);
    });

};


// This is a promise function that passes the new books to the books table.

const postBooksNo = (titleBook, 
                    status, pageCount,
                    existingPublisher, existingLanguage) => {
                                        
    return db.query(`
        BEGIN;  
                INSERT INTO books(title, checkoutstatus, pgcount, languageid, publisherid)
                VALUES($1, $2, $3,
                    (SELECT id FROM languages WHERE lang = $5),
                    (SELECT id FROM publishers WHERE publisher = $4));
 
        COMMIT;`, 
[titleBook, status, pageCount, existingPublisher,
    existingLanguage]).then((books) => {
        return books;
        
    }).catch(function (error) {
        console.log("Error posting the book into the book table", error.message);
    });

  }




const postBooksYes = (titleBook,
    status, existingBorrower,
    checkoutDate, pageCount,
    existingPublisher, existingLanguage) => {

    return db.query(`
        BEGIN;  

                INSERT INTO books (title, checkoutstatus, pgcount, languageid, publisherid, borrowerid, checkoutdate)
                VALUES($1, $2, $5,
                (SELECT id FROM languages WHERE lang = $7),
                (SELECT id FROM publishers WHERE publisher = $6),
                (SELECT id FROM borrowers WHERE CONCAT(borrowers.firstName, ' ', borrowers.lastName) = $3),
                $4);
            
        COMMIT;`,
        [titleBook, status, existingBorrower,
            checkoutDate, pageCount, existingPublisher,
            existingLanguage
        ]).then((books) => {
        return books;

    }).catch(function (error) {
        console.log("Error posting the book into the book table", error.message);
    });

}



const postAuthorsBooks = (authors, book) => {
          
        // authors is an array []
        // books is an array []


        if (typeof authors == 'string'){
            var authorArr = [];

            authorArr.push(authors);

            var inserts = [authorArr, book];
        }else {
            var inserts = [authors, book];
        }
            // console.log("Are they still arrays of strings?", inserts);
            return db.query(`

            do $$ 

            DECLARE 
                author varchar;
            BEGIN 
                        FOREACH author IN ARRAY $1 
                        LOOP

                            INSERT INTO authorsbooks (bookid, authorid)
                            VALUES( (SELECT id FROM books WHERE title=$2),
                                    (SELECT id FROM authors WHERE CONCAT(authors.firstName, ' ', authors.lastName) = author));
                        END LOOP;   
            END; $$ LANGUAGE plpgsql;`, inserts
                
        ).then((authorsBooks) => {
            return authorsBooks;
        
        }).catch(function (error) {
            console.log("Error posting the authors and books to the authorsbooks table:", error.message);
        });
}


const postGenreBooks = (genres, book) => {

    // array of genres 
    // string for books
    // The following for loop comes from: https://www.postgresql.org/docs/11/plpgsql-control-structures.html#PLPGSQL-FOREACH-ARRAY.
    
    
    if (typeof genres == 'string'){
        console.log(genres);
        var genreArr = []
        genreArr.push(genres)
        console.log(genreArr);

        var inserts = [genreArr, book]
    }else{
        var inserts = [genres, book];
    }

    return db.query(`
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
        END; $$ LANGUAGE plpgsql;`, inserts).then((genrebooks) => {
            return genrebooks;
        }).catch(function (error){
            console.log("Error while inserting into the genrebooks table:", error.message);
        });


}


module.exports = {
    postBorrower,
    postGenre,
    postLanguage,
    postPublisher,
    postNationality,
    selectAllNationalities,
    postAuthors,
    selectAllGenres,
    selectAllLanguages,
    selectAllPublishers, 
    selectAllBorrowers,
    selectAllAuthors,
    postBooksNo,
    postBooksYes,
    selectAllBooks,
    postAuthorsBooks,
    postGenreBooks

};