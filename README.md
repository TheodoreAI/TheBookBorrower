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

**This project works with MariaDB and PostgreSQL and can be hosted on Heroku using the correct config variables. For more information use: https://devcenter.heroku.com/articles/heroku-postgresql

**For a live sample of the application please visit:
    - https://thebookborrower.herokuapp.com

*Brief description of the project and my particular contribution within the project:
- TheBookBorrower came about because I have a lot of books and I like to lend them to my friends and family but with time I lose track of who had what. Naturally, I decided to build a program that would keep track of my books. The timing was perfect because I was taking CS340 and TheBookBorrower became a project I got to work with another student. We built a database web application whose purpose was to keep track of books borrowed by friends, family, and other students. I contributed in 16 different branches on GitHub where I wrote code in JavaScript, HTML, CSS, and PostgreSQL. The high-level tasks I took care of were the Create and Delete (CRUD) aspects of the TheBookBorrower. 53% of the project is written in JavaScript, and the TheBookBorrower is compatible with two of the most popular relational database systems: PostgreSQL and MariaDB Express-handlebars was used as the main HTML templating engine. The project was deployed on the platform as a service Heroku. This is some of the best work I have done in my past projects written in JavaScript. I even got an A in CS340 thanks to this project. I am currently working on a user login templating project which I hope to integrate to this project to add a user interface to allow admin to login/logout/register capabilities. 

Scope of the project - high-level overview of the project complexity and time budgeted for completion. If the project is large and was worked on by several people, we’d want to know what your specific contribution was.
-	TheBookBorrower was a 10-week project and the following are time-percentage estimates based on Git commit logs: 50% of my time was dedicated to writing JavaScript code to implement create and delete functionalities and debugging them. The creating and deleting routes were made to connect with the database. 25% of the time was spent on designing the user-interface. I built the add to database forms, their routes, and MySQL queries, as well as the home page. 10% of the time was spent meeting with my partner to plan ahead and provide updates on progress on my assigned responsibilities. 10% of the time was designing and writing some of the code for the database and making sure it worked both with MariaDB and PostgreSQL. I wrote queries to create and delete books and borrowers as well as the queries that would fill the database with the inputted information. 
And finally, 5% was spent safely deploying the entire project to be accessible by the general public. I made an application on Heroku added a PostgreSQL database to the app and figured out how to use the connectionString to allow TheBookBorrower connect to the database. 




