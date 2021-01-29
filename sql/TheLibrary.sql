-- This will be the code for our library.


-- I will make tables that I was assigned to here: the commands and the things I will need to run this file.

CREATE TABLE IF NOT Exists authors 
(author_ID int NOT NULL primary key auto_increment, 
name_last varchar(50), 
name_first varchar(50), 
country varchar(50));

Create TABLE IF NOT Exists books
(isbn varchar(20) Not Null Primary Key auto_increment,
title varchar(50), 
author_id int, 
publisher_id int, 
year_pub char(4), 
desription text);




