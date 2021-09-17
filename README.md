# TheBookBorrower

1. This is for the Portfolio Project that Rhonda Smith and Mateo Estrada worked on for CS340 at Oregon State University.

2. *To run this project you will need the dependencies listed in the package.json file.*

*To install node run:* 
    
    npm install node 13.12.0

    
*To install the HTML Templating engine Express-Handlebars run:*

    npm install express-handlebars

*To install nodemon and to run it make sure to do the following:*

    npm install nodemon
**Under the package.json, add the following code to run the server with nodemon:**
    
    "scripts": {
    "start": "nodemon ./Library/app.js"
    }
    
    -Then you can run:
    
    npm start
*To install pg-promise and to run it make sure to do the following:*

    - npm install pg-promise, pg


*Or you can do:

    - npm install // to install all dependencies required to run this app from the package.json file.

*This project works with MariaDB and PostgreSQL and can be hosted on Heroku using the correct config variables. For more information use: https://devcenter.heroku.com/articles/heroku-postgresql

    


