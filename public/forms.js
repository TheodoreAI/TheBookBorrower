// This is where the back-end of the forms will be located.

var formAdd = document.getElementById("bookForm");
var formButton = document.getElementById("submitBook")

var borrowBook = document.getElementById("status");


if (borrowBook){
    if (borrowBook.nodeValue == "Yes"){
        console.log("WHo is renting it?")
    }
}

formButton.setAttribute(onlick, "return confirm('Are you sure you want to add this book?');");

