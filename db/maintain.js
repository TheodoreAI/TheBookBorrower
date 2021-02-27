const db = require('../dbcon.js');


const postBorrower = (firstName, lastName, email, phone) =>{

    return db.query(`INSERT INTO borrowers
                            (firstName, lastName, email, phone) 
                            VALUES($1, $2, $3, $4);`
                            ,[firstName, lastName, email, phone])
        .then((post) => {

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
    return db.query(`SELECT CONCAT(authors.firstName, ' ', authors.lastName) AS "fullName" FROM authors;`
    ).then((author) => {
        return author;
    }).catch(function (error){
        console.log("Error selecting all the authors for the books form:", error.message);
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
    selectAllAuthors


};