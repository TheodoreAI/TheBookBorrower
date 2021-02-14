CREATE TABLE book(id int(11) PRIMARY KEY AUTO_INCREMENT, 
title VARCHAR(255) NOT NULL, 
checkout_status BOOLEAN NOT NULL, 
page_count int(11) NOT NULL,
language_id int,
publisher_id int,
borrower_id int,
CONSTRAINT FOREIGN KEY (language_id) REFERENCES languages (id),
CONSTRAINT FOREIGN KEY (publisher_id) REFERENCES publishers (id),
CONSTRAINT FOREIGN KEY (borrower_id) REFERENCES borrowers (id),
checkout_date DATE NOT NULL);


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
    last_name varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    phone varchar(150) NOT NULL,
    email varchar(255) NOT NULL,
    CONSTRAINT full_name UNIQUE(first_name, last_name));


CREATE TABLE authors (
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    last_name varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    nation_id int,
    CONSTRAINT FOREIGN KEY (nation_id) REFERENCES nationalities (id),
    CONSTRAINT full_name UNIQUE(first_name, last_name));

CREATE TABLE nationalities (
    id int(11) PRIMARY KEY NOT NULL,
    nation varchar(255)
)

CREATE TABLE genres (
    id int(11) PRIMARY KEY NOT NULL,
    genre varchar(255) NOT NULL, --Is this not null?
);


CREATE TABLE genrebooks (
    gid int,
    bid int,
    CONSTRAINT FOREIGN KEY (gid) REFERENCES genres (id),
    CONSTRAINT FOREIGN KEY (bid) REFERENCES books (id),

);

CREATE TABLE authorsbooks (
    bid int,
    aid int,
    CONSTRAINT FOREIGN KEY (bid) REFERENCES books (id),
    CONSTRAINT FOREIGN KEY (aid) REFERENCES authors (id),
);

